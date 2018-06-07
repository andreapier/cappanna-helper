using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CappannaHelper.Api.Persistence;
using CappannaHelper.Api.Printing;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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