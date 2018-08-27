using CappannaHelper.Api.Identity.DataModel;
using CappannaHelper.Api.Persistence;
using CappannaHelper.Api.Persistence.Modelling;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace CappannaHelper.Api.Services
{
    public class ShiftManager : IShiftManager
    {
        private readonly ApplicationDbContext _context;

        private static readonly SemaphoreSlim _semaphore;

        private static Shift _current;

        static ShiftManager()
        {
            _semaphore = new SemaphoreSlim(1, 1);
        }

        public ShiftManager(ApplicationDbContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public async Task<Shift> GetOrCreateCurrentAsync()
        {
            await _semaphore.WaitAsync();

            try
            {
                return await InternalGetOrCreateCurrentAsync();
            }
            finally
            {
                _semaphore.Release();
            }
        }

        public async Task<int> GetNextCounterAsync()
        {
            await _semaphore.WaitAsync();

            try
            {
                if (_current == null)
                {
                    await GetOrCreateCurrentAsync();
                }

                _current.OrderCounter++;
                await _context.SaveChangesAsync();

                return _current.OrderCounter;
            }
            finally
            {
                _semaphore.Release();
            }
        }

        private async Task<Shift> InternalGetOrCreateCurrentAsync()
        {
            if (_current != null)
            {
                return _current;
            }

            var now = DateTime.Now;
            var limit = now.AddHours(-1);

            _current = await _context.Orders
                .Where(o => o.CreationTimestamp >= limit)
                .OrderByDescending(o => o.CreationTimestamp)
                .Select(o => o.Shift)
                .FirstOrDefaultAsync();

            if (_current == null)
            {
                var shift = await _context.Shifts.AddAsync(new Shift
                {
                    OpenTimestamp = now,
                    Description = $"{now.ToString("dddd")} - {(now.Hour < 17 ? "Pranzo" : "Cena")}"
                });

                _current = shift.Entity;
            }

            return _current;
        }
    }
}
