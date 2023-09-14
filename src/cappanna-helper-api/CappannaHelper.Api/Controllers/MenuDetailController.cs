using CappannaHelper.Api.Hubs;
using CappannaHelper.Api.Persistence;
using CappannaHelper.Api.Persistence.Modelling;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CappannaHelper.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class MenuDetailController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly IHubContext<ChHub> _hub;

        public MenuDetailController(ApplicationDbContext context, IHubContext<ChHub> hub)
        {
            _context = context;
            _hub = hub;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            using var transaction = await _context.Database.BeginTransactionAsync();
            var result = await _context.MenuDetails
                    .OrderBy(m => m.Id)
                    .ToListAsync();
            await transaction.CommitAsync();

            return Ok(result);
        }

        [HttpPatch]
        public async Task<IActionResult> Patch([FromBody] MenuDetail detail)
        {
            if (detail == null)
            {
                return BadRequest(new { Message = "Dati del piatto non specificati" });
            }

            if (detail.Id <= 0)
            {
                return BadRequest(new { Message = "Impossibile modificare un piatto senza specificare l'Id" });
            }

            if (detail.Group == null)
            {
                return BadRequest(new { Message = "Impossibile modificare un piatto senza specificare il gruppo" });
            }

            if (string.IsNullOrEmpty(detail.Name))
            {
                return BadRequest(new { Message = "Impossibile modificare un piatto senza specificare il nome" });
            }

            if (detail.Price <= 0)
            {
                return BadRequest(new { Message = "Impossibile modificare un piatto senza specificare il prezzo" });
            }

            MenuDetail result;

            var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                result = await _context.MenuDetails.SingleOrDefaultAsync(o => o.Id == detail.Id);

                result.Group = detail.Group;
                result.Name = detail.Name;
                result.Price = detail.Price;
                result.UnitsInStock = detail.UnitsInStock;

                await _context.SaveChangesAsync();
                await transaction.CommitAsync();
            }
            catch (Exception e)
            {
                await transaction.RollbackAsync();
                throw new Exception("Impossibile salvare il piatto. Ripetere l'operazione", e);
            }

            await _hub.NotifyMenuChangedAsync(new List<MenuDetail>{ result });

            return Ok(result);
        }
    }
}
