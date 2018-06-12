using CappannaHelper.Api.Persistence;
using CappannaHelper.Api.Persistence.Modelling;
using CappannaHelper.Api.Printing;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace CappannaHelper.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PrintController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IPrintService _printService;

        public PrintController(ApplicationDbContext context, IPrintService printService)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _printService = printService ?? throw new ArgumentNullException(nameof(printService));
        }

        [Route("order/{id}")]
        public async Task<IActionResult> GetPrint(int id)
        {
            var order = await _context.Orders
                .Include(o => o.CreatedBy)
                .Include(o => o.Operations)
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
            }
            catch (Exception e)
            {
                throw new Exception("Impossibile ristampare l'ordine", e);
            }

            try
            {
                order.Operations.Add(new ChOrderOperation
                {
                    OperationTimestamp = DateTime.Now,
                    TypeId = (int)OperationTypes.Print
                });
            }
            catch
            {
                //TODO: Log
            }

            return Ok(order);
        }
    }
}