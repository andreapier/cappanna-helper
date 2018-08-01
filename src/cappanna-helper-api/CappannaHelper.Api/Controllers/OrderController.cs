using CappannaHelper.Api.Hubs;
using CappannaHelper.Api.Persistence;
using CappannaHelper.Api.Persistence.Modelling;
using CappannaHelper.Api.Printing;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace CappannaHelper.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class OrderController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly IPrintService _printService;
        private readonly IHubContext<OrderHub> _hub;

        public OrderController(ApplicationDbContext context, IPrintService printService, IHubContext<OrderHub> hub)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _printService = printService ?? throw new ArgumentNullException(nameof(printService));
            _hub = hub ?? throw new ArgumentNullException(nameof(hub));
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var limit = DateTime.Now.AddHours(-12);
            var orders = await _context.Orders
                //.Where(o => o.CreationTimestamp >= limit)
                .OrderByDescending(o=>o.CreationTimestamp)
                .ToListAsync();

            return Ok(orders);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var order = await _context
                .Orders
                .Include(o => o.Operations)
                .Include(o => o.Details)
                .ThenInclude(d => d.Item)
                .FirstOrDefaultAsync(o => o.Id == id);

            if (order == null)
            {
                return NotFound($"L'ordine con Id '{id}' non esiste");
            }

            return Ok(order);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] ChOrder order)
        {
            if (order == null)
            {
                return BadRequest("Dati dell'ordine non specificati");
            }

            if (order.Id > 0)
            {
                return BadRequest("Impossibile inviare un ordine con il campo Id valorizzato");
            }

            if (order.ChTable == null)
            {
                return BadRequest("Impossibile inviare un ordine senza specificare il tavolo");
            }

            if (order.Seats <= 0)
            {
                return BadRequest("Impossibile inviare un ordine senza specificare il numero di coperti");
            }

            if (order.Details == null || order.Details.Count <= 0)
            {
                return BadRequest("Impossibile modificare un ordine senza specificare i piatti");
            }

            EntityEntry<ChOrder> result;

            using (var transaction = _context.Database.BeginTransaction())
            {
                try
                {
                    var creationOperationId = (int)OperationTypes.Creation;
                    var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

                    if (!order.Operations.Any(o => o.Type.Id == creationOperationId || o.TypeId == creationOperationId))
                    {
                        order.Operations.Add(new ChOrderOperation
                        {
                            OperationTimestamp = DateTime.Now,
                            TypeId = creationOperationId,
                            UserId = userId
                        });
                    }
                    
                    order.CreatedById = userId;
                    order.Status = creationOperationId;

                    result = await _context.Orders.AddAsync(order);
                    await _context.SaveChangesAsync();
                    transaction.Commit();
                }
                catch (Exception e)
                {
                    throw new Exception("Impossibile salvare l'ordine. Reinviare l'ordine", e);
                }
            }

            await _hub.Clients.All.SendAsync(OrderHub.NOTIFY_ORDER_CREATED, order);

            return Ok(result.Entity);
        }

        [HttpPatch]
        public async Task<IActionResult> Patch([FromBody] ChOrder order)
        {
            if (order == null)
            {
                return BadRequest("Dati dell'ordine non specificati");
            }

            if (order.Id <= 0)
            {
                return BadRequest("Impossibile modificare un ordine senza specificare l'Id");
            }

            if (order.ChTable == null)
            {
                return BadRequest("Impossibile modificare un ordine senza specificare il tavolo");
            }

            if (order.Seats <= 0)
            {
                return BadRequest("Impossibile modificare un ordine senza specificare il numero di coperti");
            }

            if (order.Details == null || order.Details.Count <= 0)
            {
                return BadRequest("Impossibile modificare un ordine senza specificare i piatti");
            }

            EntityEntry<ChOrder> result;

            using (var transaction = _context.Database.BeginTransaction())
            {
                try
                {
                    var operationId = (int) OperationTypes.Edit;

                    var dbOrder = await _context.Orders
                        .Include(o => o.Operations)
                        .FirstOrDefaultAsync(o => o.Id == order.Id);

                    dbOrder.ChTable = order.ChTable;
                    dbOrder.Notes = order.Notes;
                    dbOrder.Seats = order.Seats;
                    dbOrder.Status = operationId;
                    dbOrder.Details.Clear();
                    
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

                    dbOrder.Operations.Add(new ChOrderOperation
                    {
                        OperationTimestamp = DateTime.Now,
                        TypeId = operationId,
                        UserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)
                    });

                    result = _context.Orders.Update(dbOrder);
                    await _context.SaveChangesAsync();
                    transaction.Commit();
                }
                catch (Exception e)
                {
                    throw new Exception("Impossibile salvare l'ordine. Ripetere l'operazione", e);
                }
            }

            await _hub.Clients.All.SendAsync(OrderHub.NOTIFY_ORDER_CHANGED, result.Entity);

            return Ok(result.Entity);
        }
    }
}