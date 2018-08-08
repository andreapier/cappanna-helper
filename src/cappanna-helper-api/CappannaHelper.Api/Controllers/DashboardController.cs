using CappannaHelper.Api.Hubs;
using CappannaHelper.Api.Persistence;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace CappannaHelper.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class DashboardController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly IHubContext<DashboardHub> _hub;

        public DashboardController(ApplicationDbContext context, IHubContext<DashboardHub> hub)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _hub = hub ?? throw new ArgumentNullException(nameof(hub));
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var menuDetails = await _context.MenuDetails.ToListAsync();
            return Ok(menuDetails);
        }
    }
}
