using CappannaHelper.Api.Models;
using CappannaHelper.Api.Persistence;
using CappannaHelper.Api.Persistence.Modelling;
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
    public class NotificationController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IShiftManager _shiftManager;

        public NotificationController(ApplicationDbContext context, IShiftManager shiftManager)
        {
            _context = context;
            _shiftManager = shiftManager;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var transaction = await _context.Database.BeginTransactionAsync();
            var currentShift = await _shiftManager.GetCurrentAsync();
            var result = await _context
                .Orders
                .Include(o => o.CreatedBy)
                .Include(o => o.Details)
                .ThenInclude(d => d.Item)
                .Where(o => o.ShiftId == currentShift.Id && !o.Operations.Any(op => op.Type == OperationTypes.Print))
                .Select(o => new NotificationModel
                {
                    Type = NotificationModel.ORDER_NOTIFICATION,
                    OrderId = o.Id,
                    TotalPrice = o.Details.Sum(d => d.Quantity * d.Item.Price),
                    Username = o.CreatedBy.UserName
                })
                .ToListAsync();

            await transaction.CommitAsync();

            return Ok(result);
        }
    }
}
