using CappannaHelper.Api.Persistence;
using CappannaHelper.Api.Persistence.Modelling;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using CappannaHelper.Api.Printing;
using Microsoft.AspNetCore.SignalR;
using CappannaHelper.Api.Hubs;

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

            if (order.CreatedById <= 0)
            {
                return BadRequest("Impossibile inviare un ordine senza Id utente");
            }

            if (order.ChTable == null)
            {
                return BadRequest("Impossibile inviare un ordine senza tavolo");
            }

            if (order.Seats <= 0)
            {
                return BadRequest("Impossibile inviare un ordine senza numero di coperti");
            }

            EntityEntry<ChOrder> result;

            using (var transaction = _context.Database.BeginTransaction())
            {
                try
                {
                    var creationOperationId = (int)OperationTypes.Creation;

                    if (!order.Operations.Any(o => o.Type.Id == creationOperationId || o.TypeId == creationOperationId))
                    {
                        order.Operations.Add(new ChOrderOperation
                        {
                            OperationTimestamp = DateTime.Now,
                            TypeId = creationOperationId
                        });
                    }

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

        [Route("{id}")]
        public async Task<IActionResult> SetStatus(int id, [FromBody] int status)
        {
            var order = await _context.Orders.SingleOrDefaultAsync(o => o.Id == id);

            if (order == null)
            {
                return NotFound($"L'ordine con Id '{id}' non esiste");
            }

            try
            {        
                order.Status = status;
                await _context.SaveChangesAsync();

                return Ok(order);
            }
            catch (Exception e)
            {
                throw new Exception("Impossibile impostare lo stato dell'ordine", e);
            }
        }
    }
}