using CappannaHelper.Api.Persistence;
using CappannaHelper.Api.Persistence.Modelling;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace CappannaHelper.Api.Services
{
    public class ShiftManager : IShiftManager
    {
        private readonly ApplicationDbContext _context;

        public ShiftManager(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Shift> GetOrCreateCurrentAsync()
        {
            var now = DateTime.Now;
            var limit = now.AddHours(-2);

            var result = await _context.Orders
                .Where(o => o.CreationTimestamp >= limit)
                .OrderByDescending(o => o.CreationTimestamp)
                .Select(o => o.Shift)
                .FirstOrDefaultAsync();

            if (result == null)
            {
                result = await _context.Shifts
                    .Where(o => o.OpenTimestamp >= limit)
                    .OrderByDescending(o => o.OpenTimestamp)
                    .FirstOrDefaultAsync();

                if (result == null)
                {
                    var shift = await _context.Shifts.AddAsync(new Shift
                    {
                        OpenTimestamp = now,
                        Description = $"{now:dddd} - {(now.Hour < 17 ? "Pranzo" : "Cena")}"
                    });

                    await _context.SaveChangesAsync();

                    result = shift.Entity;
                }
            }

            return result;
        }
    }
}
