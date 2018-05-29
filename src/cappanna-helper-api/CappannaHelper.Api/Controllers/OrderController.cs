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

namespace CappannaHelper.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class OrderController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly IPrintService _printService;

        public OrderController(ApplicationDbContext context, IPrintService printService)
        {
            if (context == null)
            {
                throw new ArgumentNullException(nameof(context));
            }
            if (printService == null)
            {
                throw new ArgumentNullException(nameof(printService));
            }

            _context = context;
            _printService = printService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var orders = await _context.Orders
                .Where(o => o.CreationTimestamp >= DateTime.Now.AddHours(-12))
                .ToListAsync();

            return Ok(orders);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var order = await _context
                .Orders
                .Include(o => o.Details)
                .ThenInclude(d => d.Item)
                .FirstOrDefaultAsync(o => o.Id == id);

            if (order == null)
            {
                return NotFound($"L'ordine con Id '{id} non esiste");
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
                    result = await _context.Orders.AddAsync(order);
                    await _context.SaveChangesAsync();
                    transaction.Commit();
                }
                catch (Exception e)
                {
                    throw new Exception("Impossibile salvare l'ordine. L'ordine NON è stato salvato. Reinviare l'ordine", e);
                }
            }

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

        [Route("{id}/print")]
        public async Task<IActionResult> GetPrint(int id)
        {
            var order = await _context.Orders
                .Include(o => o.CreatedBy)
                .Include(o => o.Details)
                .ThenInclude(d => d.Item)
                .FirstOrDefaultAsync(o => o.Id == id);

            if (order == null)
            {
                return NotFound($"L'ordine con Id '{id}' non esiste");
            }

            try
            {        
                await _printService.PrintAsync(order);
                return Ok(order);
            }
            catch (Exception e)
            {
                throw new Exception("Impossibile ristampare l'ordine", e);
            }
        }
    }
}