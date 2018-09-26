using CappannaHelper.Api.Models;
using CappannaHelper.Api.Persistence;
using CappannaHelper.Api.Persistence.Modelling;
using CappannaHelper.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CappannaHelper.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class NotificationController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly IShiftManager _shiftManager;

        public NotificationController(ApplicationDbContext context, IShiftManager shiftManager)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _shiftManager = shiftManager ?? throw new ArgumentNullException(nameof(shiftManager));
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var result = new List<NotificationModel>();

            using (var transaction = await _context.Database.BeginTransactionAsync())
            {
                var currentShift = await _shiftManager.GetOrCreateCurrentAsync();
                var toBePrintedOrders = await _context
                    .Orders
                    .Include(o => o.CreatedBy)
                    .Include(o => o.Details)
                    .ThenInclude(d => d.Item)
                    .Where(o => o.ShiftId == currentShift.Id && !o.Operations.Any(op => op.TypeId == (int) OperationTypes.Print))
                    .Select(o => new NotificationModel
                    {
                        Type = NotificationModel.ORDER_NOTIFICATION,
                        OrderId = o.Id,
                        TotalPrice = o.Details.Sum(d => d.Quantity * d.Item.Price),
                        Username = o.CreatedBy.UserName
                    })
                    .ToListAsync();

                transaction.Commit();
                result.AddRange(toBePrintedOrders);
            }

            return Ok(result);
        }
    }
}
