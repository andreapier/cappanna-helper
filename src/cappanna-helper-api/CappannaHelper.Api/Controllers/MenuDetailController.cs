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
    public class MenuDetailController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly IHubContext<MenuHub> _hub;

        public MenuDetailController(ApplicationDbContext context, IHubContext<MenuHub> hub)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _hub = hub ?? throw new ArgumentNullException(nameof(hub));
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            List<MenuDetail> result;

            using (var transaction = await _context.Database.BeginTransactionAsync())
            {
                result = await _context.MenuDetails
                    .OrderBy(m => m.Id)
                    .ToListAsync();
            }

            return Ok(result);
        }

        [HttpPatch]
        public async Task<IActionResult> Patch([FromBody] MenuDetail detail)
        {
            if (detail == null)
            {
                return BadRequest("Dati del piatto non specificati");
            }

            if (detail.Id <= 0)
            {
                return BadRequest("Impossibile modificare un piatto senza specificare l'Id");
            }

            if (detail.Group == null)
            {
                return BadRequest("Impossibile modificare un piatto senza specificare il gruppo");
            }

            if (string.IsNullOrEmpty(detail.Name))
            {
                return BadRequest("Impossibile modificare un piatto senza specificare il nome");
            }

            if (detail.Price <= 0)
            {
                return BadRequest("Impossibile modificare un piatto senza specificare il prezzo");
            }

            MenuDetail result;

            using (var transaction = await _context.Database.BeginTransactionAsync())
            {
                try
                {
                    var dbDetail = await _context.MenuDetails.SingleOrDefaultAsync(o => o.Id == detail.Id);

                    dbDetail.Group = detail.Group;
                    dbDetail.Name = detail.Name;
                    dbDetail.Price = detail.Price;
                    dbDetail.UnitsInStock = detail.UnitsInStock;

                    await _context.SaveChangesAsync();

                    result = dbDetail;

                    transaction.Commit();
                } catch (Exception e)
                {
                    throw new Exception("Impossibile salvare il piatto. Ripetere l'operazione", e);
                }
            }

            await _hub.Clients.All.SendAsync(MenuHub.NOTIFY_MENU_DETAIL_CHANGED, result);

            return Ok(result);
        }
    }
}
