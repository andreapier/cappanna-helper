using CappannaHelper.Api.Models;
using CappannaHelper.Api.Persistence;
using CappannaHelper.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace CappannaHelper.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly IShiftManager _shiftManager;

        public DashboardController(ApplicationDbContext context, IShiftManager shiftManager)
        {
            _context = context;
            _shiftManager = shiftManager;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            using var transaction = await _context.Database.BeginTransactionAsync();
            var shift = await _shiftManager.GetCurrentAsync();
            var waitersStats = await _context.Orders
                .Where(o => o.ShiftId == shift.Id)
                .GroupBy(o => o.CreatedById)
                .Select(g => new WaiterStats
                {
                    UserId = g.First().CreatedById,
                    Waiter = g.First().CreatedBy.UserName,
                    OrdersQuantity = g.Count(),
                    Income = g.Sum(o => o.Details.Sum(d => d.Quantity * d.Item.Price))
                })
                .OrderByDescending(r => r.Income)
                .ToListAsync();
            var orderStats = await _context.Orders
                .Where(o => o.ShiftId == shift.Id)
                .GroupBy(o => o.StandId)
                .Select(g => new OrderStat
                {
                    StandId = g.First().StandId,
                    StandName = g.First().Stand.Description,
                    OrdersQuantity = g.Count(),
                    Income = g.Sum(o => o.Details.Sum(d => d.Quantity * d.Item.Price))
                })
                .OrderByDescending(r => r.Income)
                .ToListAsync();
            var result = new DashboardModel
            {
                OrderStats = orderStats,
                Income = shift.Income,
                WaitersStats = waitersStats
            };
            await transaction.CommitAsync();

            return Ok(result);
        }
    }
}
