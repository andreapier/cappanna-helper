﻿using CappannaHelper.Api.Models;
using CappannaHelper.Api.Persistence;
using CappannaHelper.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace CappannaHelper.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class DashboardController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly IShiftManager _shiftManager;

        public DashboardController(ApplicationDbContext context, IShiftManager shiftManager)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _shiftManager = shiftManager ?? throw new ArgumentNullException(nameof(shiftManager));
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var shift = await _shiftManager.GetOrCreateCurrentAsync();
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
            var result = new DashboardModel
            {
                OrdersQuantity = shift.OrderCounter,
                Income = shift.Income,
                WaitersStats = waitersStats
            };

            return Ok(result);
        }
    }
}
