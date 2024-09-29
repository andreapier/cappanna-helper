using CappannaHelper.Api.Persistence;
using CappannaHelper.Api.Persistence.Modelling;
using Microsoft.EntityFrameworkCore;
using System;
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

        public async Task<Shift> GetCurrentAsync()
        {
            var now = DateTime.Now;
            var result = await _context.Shifts.SingleOrDefaultAsync(e => e.OpenTimestamp <= now && e.CloseTimestamp >= now);
            return result;
        }
    }
}
