using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using CappannaHelper.Api.Hubs;
using CappannaHelper.Api.Persistence;
using CappannaHelper.Api.Persistence.Modelling;
using CappannaHelper.Api.Printing;
using CappannaHelper.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace CappannaHelper.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class OrderController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly IPrintService _printService;
        private readonly IHubContext<ChHub> _hub;
        private readonly IShiftManager _shiftManager;
        private readonly ISettingManager _settingManager;

        public OrderController(
            ApplicationDbContext context,
            IPrintService printService,
            IHubContext<ChHub> hub,
            IShiftManager shiftManager,
            ISettingManager settingManager)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _printService = printService ?? throw new ArgumentNullException(nameof(printService));
            _hub = hub ?? throw new ArgumentNullException(nameof(hub));
            _shiftManager = shiftManager ?? throw new ArgumentNullException(nameof(shiftManager));
            _settingManager = settingManager ?? throw new ArgumentNullException(nameof(settingManager));
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            List<ChOrder> result;

            using (var transaction = await _context.Database.BeginTransactionAsync())
            {
                var currentShift = await _shiftManager.GetOrCreateCurrentAsync();
                result = await _context.Orders
                    .Include(o => o.CreatedBy)
                    .Where(o => o.ShiftId == currentShift.Id)
                    .OrderByDescending(o => o.CreationTimestamp)
                    .ToListAsync();

                transaction.Commit();
            }

            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            ChOrder result;

            using (var transaction = await _context.Database.BeginTransactionAsync())
            {
                result = await _context
                    .Orders
                    .Include(o => o.CreatedBy)
                    .Include(o => o.Details)
                    .ThenInclude(d => d.Item)
                    .SingleOrDefaultAsync(o => o.Id == id);

                transaction.Commit();
            }

            if (result == null)
            {
                return NotFound(new { Message = $"L'ordine con Id '{id}' non esiste" });
            }

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

            if (order.ChTable == null)
            {
                return BadRequest(new { Message = "Impossibile inviare un ordine senza specificare il tavolo" });
            }

            if (order.Seats <= 0)
            {
                return BadRequest(new { Message = "Impossibile inviare un ordine senza specificare il numero di coperti" });
            }

            if (order.Details == null || order.Details.Count <= 0)
            {
                return BadRequest(new { Message = "Impossibile inviare un ordine senza specificare i piatti" });
            }

            ChOrder result;
            var limitedStockMenuDetails = new List<MenuDetail>();
            var autoPrint = false;

            using (var transaction = await _context.Database.BeginTransactionAsync())
            {
                try
                {
                    var creationOperationId = (int)OperationTypes.Creation;
                    var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
                    var shift = await _shiftManager.GetOrCreateCurrentAsync();
                    autoPrint = await _settingManager.GetSettingValue<bool>(Setting.AUTO_PRINT);

                    shift.OrderCounter++;

                    order.Operations = new List<ChOrderOperation>();
                    order.Operations.Add(new ChOrderOperation
                    {
                        OperationTimestamp = DateTime.Now,
                        TypeId = creationOperationId,
                        UserId = userId
                    });

                    order.CreatedById = userId;
                    order.Status = creationOperationId;
                    order.ShiftId = shift.Id;
                    order.ShiftCounter = shift.OrderCounter;

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
                            var printOperationId = (int) OperationTypes.Print;

                            result.Operations.Add(new ChOrderOperation
                            {
                                OperationTimestamp = DateTime.Now,
                                TypeId = printOperationId,
                                UserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)
                            });
                            result.Status = printOperationId;
                        }
                        catch(Exception e)
                        {
                            throw new Exception("Impossibile salvare l'operazione di stampa dell'ordine", e);
                        }
                    }

                    await _context.SaveChangesAsync();
                    transaction.Commit();
                }
                catch (Exception e)
                {
                    throw new Exception("Impossibile salvare l'ordine. Reinviare l'ordine", e);
                }
            }

            if (autoPrint)
            {
                await _hub.Clients.All.SendAsync(ChHub.NOTIFY_ORDER_PRINTED, result);
            }
            else
            {
                await _hub.Clients.All.SendAsync(ChHub.NOTIFY_ORDER_CREATED, result);
            }

            if (limitedStockMenuDetails.Any())
            {
                await _hub.Clients.All.SendAsync(ChHub.NOTIFY_MENU_DETAILS_CHANGED, limitedStockMenuDetails);
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

            if (order.ChTable == null)
            {
                return BadRequest(new { Message = "Impossibile modificare un ordine senza specificare il tavolo" });
            }

            if (order.Seats <= 0)
            {
                return BadRequest(new { Message = "Impossibile modificare un ordine senza specificare il numero di coperti" });
            }

            if (order.Details == null || order.Details.Count <= 0)
            {
                return BadRequest(new { Message = "Impossibile modificare un ordine senza specificare i piatti" });
            }

            ChOrder result;

            using (var transaction = await _context.Database.BeginTransactionAsync())
            {
                try
                {
                    var operationId = (int) OperationTypes.Edit;
                    var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
                    var shift = await _shiftManager.GetOrCreateCurrentAsync();

                    var dbOrder = await _context.Orders
                        .Include(o => o.Operations)
                        .Include(o => o.Details)
                        .ThenInclude(d => d.Item)
                        .SingleOrDefaultAsync(o => o.Id == order.Id);

                    if (dbOrder.Operations.Any(o => o.TypeId == (int)OperationTypes.Print))
                    {
                        transaction.Rollback();

                        return BadRequest(new { Message = "Impossibile modificare un ordine stampato" });
                    }

                    if (dbOrder.ShiftId != shift.Id)
                    {
                        transaction.Rollback();

                        return BadRequest(new { Message = "Impossibile modificare un ordine creato in un altro turno" });
                    }

                    shift.Income -= dbOrder.Details.Sum(d => d.Quantity * d.Item.Price);
                    dbOrder.ChTable = order.ChTable;
                    dbOrder.Notes = order.Notes;
                    dbOrder.Seats = order.Seats;
                    dbOrder.Status = operationId;
                    
                    foreach(var detail in order.Details)
                    {
                        var dbDetail = dbOrder.Details.FirstOrDefault(d => d.ItemId == detail.ItemId);
                        
                        if (dbDetail == null)
                        {
                            dbOrder.Details.Add(detail);
                        }
                        else
                        {
                            dbDetail.Quantity = detail.Quantity;
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
                        dbOrder.Details.Remove(detail);
                    }

                    dbOrder.Operations.Add(new ChOrderOperation
                    {
                        OperationTimestamp = DateTime.Now,
                        TypeId = operationId,
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

                    transaction.Commit();
                }
                catch (Exception e)
                {
                    throw new Exception("Impossibile salvare l'ordine. Ripetere l'operazione", e);
                }
            }

            await _hub.Clients.All.SendAsync(ChHub.NOTIFY_ORDER_CHANGED, result);

            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            ChOrder result;

            using (var transaction = await _context.Database.BeginTransactionAsync())
            {
                var shift = await _shiftManager.GetOrCreateCurrentAsync();
                var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

                result = await _context
                    .Orders
                    .Include(o => o.Operations)
                    .Include(o => o.Details)
                    .ThenInclude(d => d.Item)
                    .SingleOrDefaultAsync(o => o.Id == id);

                if (result == null)
                {
                    transaction.Rollback();

                    return NotFound(new { Message = $"L'ordine con Id '{id}' non esiste" });
                }

                if (result.Operations.Any(o => o.TypeId == (int)OperationTypes.Print))
                {
                    transaction.Rollback();
                    
                    return BadRequest(new { Message = "Impossibile eliminare un ordine stampato" });
                }

                if(result.ShiftId != shift.Id)
                {
                    transaction.Rollback();

                    return BadRequest(new { Message = "Impossibile eliminare un ordine creato in un altro turno" });
                }

                try
                    {
                    shift.Income -= result.Details.Sum(d => d.Quantity * d.Item.Price);
                    _context.Orders.Remove(result);

                    await _context.SaveChangesAsync();
                    transaction.Commit();
                }
                catch (Exception e)
                {
                    throw new Exception("Impossibile eliminare l'ordine. Ripetere l'operazione", e);
                }
            }

            await _hub.Clients.All.SendAsync(ChHub.NOTIFY_ORDER_DELETED, result);

            return Ok(result);
        }

        [HttpPatch("{id}/close")]
        public async Task<IActionResult> Close(int id)
        {
            ChOrder result;

            using(var transaction = await _context.Database.BeginTransactionAsync())
            {
                var operationId = (int) OperationTypes.Close;
                var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
                var shift = await _shiftManager.GetOrCreateCurrentAsync();

                result = await _context
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

                if(!result.Operations.Any(o => o.TypeId == (int) OperationTypes.Print))
                {
                    transaction.Rollback();

                    return BadRequest(new { Message = "Impossibile chiudere un ordine non stampato" });
                }

                if(result.Operations.Any(o => o.TypeId == (int) OperationTypes.Close))
                {
                    transaction.Rollback();

                    return BadRequest(new { Message = "Impossibile chiudere un ordine già chiuso" });
                }

                if(result.ShiftId != shift.Id)
                {
                    transaction.Rollback();

                    return BadRequest(new { Message = "Impossibile chiudere un ordine creato in un altro turno" });
                }

                result.Status = operationId;
                result.Operations.Add(new ChOrderOperation
                {
                    OperationTimestamp = DateTime.Now,
                    TypeId = operationId,
                    UserId = userId
                });

                await _context.SaveChangesAsync();
                transaction.Commit();
            }

            await _hub.Clients.All.SendAsync(ChHub.NOTIFY_ORDER_CLOSED, result);

            return Ok(result);
        }
    }
}
