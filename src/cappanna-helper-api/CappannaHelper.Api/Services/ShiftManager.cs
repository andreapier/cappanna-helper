using CappannaHelper.Api.Identity.DataModel;
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

        private Shift _current;

        public ShiftManager(ApplicationDbContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public async Task<Shift> GetOrCreateCurrent(ApplicationUser user)
        {
            if (_current != null)
            {
                return _current;
            }

            var now = DateTime.Now;
            var limit = now.AddHours(-1);

            using (var transaction = await _context.Database.BeginTransactionAsync())
            {
                _current = await _context.Orders
                    .Include(o => o.Shift)
                    .Where(o => o.CreationTimestamp >= limit)
                    .OrderByDescending(o => o.CreationTimestamp)
                    .Select(o => o.Shift)
                    .FirstAsync();

                if (_current == null)
                {
                    var shift = await _context.Shifts.AddAsync(new Shift {
                        OpenTimestamp = now,
                        CreatedById = user.Id,
                        CreationTimestamp = now,
                        Description = $"{now.ToString("dddd")} - {(now.Hour < 17 ? "Pranzo" : "Cena")}"
                    });

                    _current = shift.Entity;
                }
                
                transaction.Commit();
            }

            return _current;
        }
    }
}
