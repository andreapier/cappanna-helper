using CappannaHelper.Api.Hubs;
using CappannaHelper.Api.Persistence;
using CappannaHelper.Api.Persistence.Modelling;
using CappannaHelper.Api.Printing;
using CappannaHelper.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace CappannaHelper.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly IPrintService _printService;
        private readonly IHubContext<ChHub> _hub;
        private readonly IShiftManager _shiftManager;
        private readonly ISettingManager _settingManager;
        private readonly ILogger _logger;

        public OrderController(
            ApplicationDbContext context,
            IPrintService printService,
            IHubContext<ChHub> hub,
            IShiftManager shiftManager,
            ISettingManager settingManager,
            ILogger<OrderController> logger)
        {
            _context = context;
            _printService = printService;
            _hub = hub;
            _logger = logger;
            _shiftManager = shiftManager;
            _settingManager = settingManager;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var transaction = await _context.Database.BeginTransactionAsync();
            var currentShift = await _shiftManager.GetCurrentAsync();
            var result = await _context.Orders
                .Include(e => e.CreatedBy)
                .Where(o => o.ShiftId == currentShift.Id)
                .OrderByDescending(o => o.CreationTimestamp)
                .ToListAsync();

            await transaction.CommitAsync();
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var transaction = await _context.Database.BeginTransactionAsync();
            var result = await _context
                .Orders
                .Include(o => o.CreatedBy)
                .Include(o => o.Details)
                .ThenInclude(d => d.Item)
                .SingleOrDefaultAsync(o => o.Id == id);

            if (result == null)
            {
                await transaction.RollbackAsync();
                return NotFound(new { Message = $"L'ordine con Id '{id}' non esiste" });
            }

            await transaction.CommitAsync();
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] ChOrder order)
        {
            if (order == null)
            {
                return BadRequest(new { Message = "Dati dell'ordine non specificati" });
            }

            if (order.Id > 0)
            {
                return BadRequest(new { Message = "Impossibile inviare un ordine con il campo Id valorizzato" });
            }

            if (string.IsNullOrWhiteSpace(order.ChTable))
            {
                return BadRequest(new { Message = "Impossibile inviare un ordine senza specificare il tavolo" });
            }

            if (string.IsNullOrWhiteSpace(order.Customer))
            {
                return BadRequest(new { Message = "Impossibile inviare un ordine senza specificare il cliente" });
            }

            if (order.Seats <= 0)
            {
                return BadRequest(new { Message = "Impossibile inviare un ordine senza specificare il numero di coperti" });
            }

            if (order.StandId <= 0)
            {
                return BadRequest(new { Message = "Impossibile inviare un ordine senza specificare lo stand" });
            }

            if (order.Details == null || order.Details.Count <= 0)
            {
                return BadRequest(new { Message = "Impossibile inviare un ordine senza specificare i piatti" });
            }

            ChOrder result;
            var limitedStockMenuDetails = new List<MenuDetail>();
            var autoPrint = false;

            var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                var creationOperation = OperationTypes.Creation;
                var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
                var shift = await _shiftManager.GetCurrentAsync();

                autoPrint = await _settingManager.GetSettingValue<bool>(Setting.AUTO_PRINT);

                shift.OrderCounter++;

                order.Operations = new List<ChOrderOperation>
                {
                    new ChOrderOperation
                    {
                        OperationTimestamp = DateTime.Now,
                        Type = creationOperation,
                        UserId = userId
                    }
                };

                order.CreatedById = userId;
                order.Status = creationOperation;
                order.ShiftId = shift.Id;
                order.ShiftCounter = shift.OrderCounter;

                await SetStandAsync(order);

                var dbOrder = await _context.Orders.AddAsync(order);
                await _context.SaveChangesAsync();

                result = await _context
                    .Orders
                    .Include(o => o.CreatedBy)
                    .Include(o => o.Details)
                    .ThenInclude(d => d.Item)
                    .SingleAsync(o => o.Id == dbOrder.Entity.Id);
                    
                shift.Income += result.Details.Sum(d => d.Quantity * d.Item.Price);

                foreach(var detail in result.Details)
                {
                    if (detail.Item.UnitsInStock.HasValue)
                    {
                        detail.Item.UnitsInStock -= result.Details.Single(d => d.ItemId == detail.ItemId).Quantity;

                        if (detail.Item.UnitsInStock.Value < 0)
                        {
                            detail.Item.UnitsInStock = 0;
                        }

                        limitedStockMenuDetails.Add(detail.Item);
                    }
                }

                if (autoPrint)
                {
                    try
                    {
                        await _printService.PrintAsync(result);
                    }
                    catch(Exception e)
                    {
                        throw new Exception("Impossibile stampare l'ordine", e);
                    }

                    try
                    {
                        var printOperation = OperationTypes.Print;

                        result.Operations.Add(new ChOrderOperation
                        {
                            OperationTimestamp = DateTime.Now,
                            Type = printOperation,
                            UserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)
                        });
                        result.Status = printOperation;
                    }
                    catch(Exception e)
                    {
                        throw new Exception("Impossibile salvare l'operazione di stampa dell'ordine", e);
                    }
                }

                await _context.SaveChangesAsync();
                await transaction.CommitAsync();
            }
            catch (Exception e)
            {
                throw new Exception("Impossibile salvare l'ordine. Reinviare l'ordine", e);
            }

            if (autoPrint)
            {
                await _hub.NotifyOrderChangedAsync(ChHub.NOTIFY_ORDER_PRINTED, result);
            }
            else
            {
                await _hub.NotifyOrderChangedAsync(ChHub.NOTIFY_ORDER_CREATED, result);
            }

            if (limitedStockMenuDetails.Any())
            {
                await _hub.NotifyMenuChangedAsync(limitedStockMenuDetails);
            }

            return Ok(result);
        }

        [HttpPatch]
        public async Task<IActionResult> Patch([FromBody] ChOrder order)
        {
            if (order == null)
            {
                return BadRequest(new { Message = "Dati dell'ordine non specificati" });
            }

            if (order.Id <= 0)
            {
                return BadRequest(new { Message = "Impossibile modificare un ordine senza specificare l'Id" });
            }

            if (string.IsNullOrEmpty(order.ChTable))
            {
                return BadRequest(new { Message = "Impossibile modificare un ordine senza specificare il tavolo" });
            }

            if (string.IsNullOrEmpty(order.Customer))
            {
                return BadRequest(new { Message = "Impossibile modificare un ordine senza specificare il cliente" });
            }

            if (order.Seats <= 0)
            {
                return BadRequest(new { Message = "Impossibile modificare un ordine senza specificare il numero di coperti" });
            }

            if (order.StandId <= 0)
            {
                return BadRequest(new { Message = "Impossibile modificare un ordine senza specificare lo stand" });
            }

            if (order.Details == null || order.Details.Count <= 0)
            {
                return BadRequest(new { Message = "Impossibile modificare un ordine senza specificare i piatti" });
            }

            ChOrder result;
            var limitedStockMenuDetails = new List<MenuDetail>();

            var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                var editOperation = OperationTypes.Edit;
                var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
                var shift = await _shiftManager.GetCurrentAsync();

                var dbOrder = await _context.Orders
                    .Include(o => o.Operations)
                    .Include(o => o.Details)
                    .ThenInclude(d => d.Item)
                    .SingleOrDefaultAsync(o => o.Id == order.Id);

                if (dbOrder.Operations.Any(o => o.Type == OperationTypes.Print))
                {
                    await transaction.RollbackAsync();
                    return BadRequest(new { Message = "Impossibile modificare un ordine stampato" });
                }

                if (dbOrder.ShiftId != shift.Id)
                {
                    await transaction.RollbackAsync();
                    return BadRequest(new { Message = "Impossibile modificare un ordine creato in un altro turno" });
                }

                shift.Income -= dbOrder.Details.Sum(d => d.Quantity * d.Item.Price);
                dbOrder.ChTable = order.ChTable;
                dbOrder.Notes = order.Notes;
                dbOrder.Seats = order.Seats;
                dbOrder.Customer = order.Customer;
                dbOrder.Status = editOperation;

                await SetStandAsync(dbOrder);

                foreach (var detail in order.Details)
                {
                    var dbDetail = dbOrder.Details.FirstOrDefault(d => d.ItemId == detail.ItemId);
                        
                    if (dbDetail == null)
                    {
                        dbOrder.Details.Add(detail);

                        var dbItem = await _context.MenuDetails.FirstAsync(d => d.Id == detail.ItemId);

                        if(dbItem.UnitsInStock.HasValue)
                        {
                            dbItem.UnitsInStock -= detail.Quantity;

                            if(dbItem.UnitsInStock.Value < 0)
                            {
                                dbItem.UnitsInStock = 0;
                            }

                            limitedStockMenuDetails.Add(dbItem);
                        }
                    }
                    else
                    {
                        var changedQuantity = detail.Quantity - dbDetail.Quantity;
                        dbDetail.Quantity = detail.Quantity;

                        if(dbDetail.Item.UnitsInStock.HasValue)
                        {
                            dbDetail.Item.UnitsInStock -= changedQuantity;

                            if(dbDetail.Item.UnitsInStock.Value < 0)
                            {
                                dbDetail.Item.UnitsInStock = 0;
                            }

                            limitedStockMenuDetails.Add(dbDetail.Item);
                        }
                    }
                }

                var toBeRemoveDetails = new List<OrderDetail>();

                foreach (var detail in dbOrder.Details)
                {
                    if (!order.Details.Any(d => d.ItemId == detail.ItemId))
                    {
                        toBeRemoveDetails.Add(detail);
                    }
                }

                foreach(var detail in toBeRemoveDetails)
                {
                    var dbDetail = dbOrder.Details.Single(d => d.ItemId == detail.ItemId);

                    if(dbDetail.Item.UnitsInStock.HasValue)
                    {
                        dbDetail.Item.UnitsInStock += detail.Quantity;

                        if(dbDetail.Item.UnitsInStock.Value < 0)
                        {
                            detail.Item.UnitsInStock = 0;
                        }

                        if (!limitedStockMenuDetails.Any(d => d.Id == dbDetail.ItemId))
                        {
                            limitedStockMenuDetails.Add(dbDetail.Item);
                        }
                    }

                    dbOrder.Details.Remove(detail);
                }

                dbOrder.Operations.Add(new ChOrderOperation
                {
                    OperationTimestamp = DateTime.Now,
                    Type = editOperation,
                    UserId = userId
                });

                await _context.SaveChangesAsync();

                result = await _context.Orders
                    .Include(o => o.CreatedBy)
                    .Include(o => o.Details)
                    .ThenInclude(d => d.Item)
                    .SingleOrDefaultAsync(o => o.Id == order.Id);

                shift.Income += result.Details.Sum(d => d.Quantity * d.Item.Price);

                await _context.SaveChangesAsync();

                await transaction.CommitAsync();
            }
            catch (Exception e)
            {
                throw new Exception("Impossibile salvare l'ordine. Ripetere l'operazione", e);
            }

            await _hub.NotifyOrderChangedAsync(ChHub.NOTIFY_ORDER_CHANGED, result);

            if(limitedStockMenuDetails.Any())
            {
                await _hub.NotifyMenuChangedAsync(limitedStockMenuDetails);
            }

            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var limitedStockMenuDetails = new List<MenuDetail>();

            var transaction = await _context.Database.BeginTransactionAsync();
            var shift = await _shiftManager.GetCurrentAsync();

            var result = await _context
                .Orders
                .Include(o => o.CreatedBy)
                .Include(o => o.Operations)
                .Include(o => o.Details)
                .ThenInclude(d => d.Item)
                .SingleOrDefaultAsync(o => o.Id == id);

            if (result == null)
            {
                await transaction.RollbackAsync();
                return NotFound(new { Message = $"L'ordine con Id '{id}' non esiste" });
            }

            if (result.Operations.Any(o => o.Type == OperationTypes.Print))
            {
                await transaction.RollbackAsync();
                return BadRequest(new { Message = "Impossibile eliminare un ordine stampato" });
            }

            if (result.ShiftId != shift.Id)
            {
                await transaction.RollbackAsync();
                return BadRequest(new { Message = "Impossibile eliminare un ordine creato in un altro turno" });
            }

            try
            {
                shift.Income -= result.Details.Sum(d => d.Quantity * d.Item.Price);
                _context.Orders.Remove(result);

                foreach (var detail in result.Details)
                {
                    if (detail.Item.UnitsInStock.HasValue)
                    {
                        detail.Item.UnitsInStock += result.Details.Single(d => d.ItemId == detail.ItemId).Quantity;

                        if (detail.Item.UnitsInStock.Value < 0)
                        {
                            detail.Item.UnitsInStock = 0;
                        }

                        limitedStockMenuDetails.Add(detail.Item);
                    }
                }

                await _context.SaveChangesAsync();
                await transaction.CommitAsync();
            }
            catch (Exception e)
            {
                throw new Exception("Impossibile eliminare l'ordine. Ripetere l'operazione", e);
            }

            await _hub.NotifyOrderChangedAsync(ChHub.NOTIFY_ORDER_DELETED, result);

            if (limitedStockMenuDetails.Any())
            {
                await _hub.NotifyMenuChangedAsync(limitedStockMenuDetails);
            }

            return Ok(result);
        }

        [HttpPatch("{id}/close")]
        public async Task<IActionResult> Close(int id)
        {
            var transaction = await _context.Database.BeginTransactionAsync();
            var closeOperation = OperationTypes.Close;
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var shift = await _shiftManager.GetCurrentAsync();

            var result = await _context
                .Orders
                .Include(o => o.Operations)
                .Include(o => o.CreatedBy)
                .Include(o => o.Details)
                .ThenInclude(d => d.Item)
                .SingleOrDefaultAsync(o => o.Id == id);

            if(result == null)
            {
                return NotFound(new { Message = $"L'ordine con Id '{id}' non esiste" });
            }

            if(!result.Operations.Any(o => o.Type == OperationTypes.Print))
            {
                await transaction.RollbackAsync();
                return BadRequest(new { Message = "Impossibile chiudere un ordine non stampato" });
            }

            if(result.Operations.Any(o => o.Type == OperationTypes.Close))
            {
                await transaction.RollbackAsync();
                return BadRequest(new { Message = "Impossibile chiudere un ordine gi� chiuso" });
            }

            if(result.ShiftId != shift.Id)
            {
                await transaction.RollbackAsync();
                return BadRequest(new { Message = "Impossibile chiudere un ordine creato in un altro turno" });
            }

            result.Status = closeOperation;
            result.Operations.Add(new ChOrderOperation
            {
                OperationTimestamp = DateTime.Now,
                Type = closeOperation,
                UserId = userId
            });

            await _context.SaveChangesAsync();
            await transaction.CommitAsync();

            await _hub.NotifyOrderChangedAsync(ChHub.NOTIFY_ORDER_CLOSED, result);

            return Ok(result);
        }

        private async Task SetStandAsync(ChOrder order)
        {
            try
            {
                // 1, 12, 49   => stand Baseball
                // 50, 51, 100 => stand Zena
                var table = int.Parse(order.ChTable);

                if (table < 50)
                {
                    order.Stand = await _context.Stands.SingleAsync(s => s.Description == "Cupra baseball");
                }
                else
                {
                    order.Stand = await _context.Stands.SingleAsync(s => s.Description == "Zena");
                }

                order.StandId = order.Stand.Id;
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Impossibile calcolare stand automaticamente per ordine {Id}. Verr� usato lo stand nativo dell'ordine: {description}", order.Id, order.Stand?.Description);
            }
        }
    }
}
