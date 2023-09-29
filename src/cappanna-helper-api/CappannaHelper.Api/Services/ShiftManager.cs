using CappannaHelper.Api.Persistence;
using CappannaHelper.Api.Persistence.Modelling;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Threading.Tasks;

namespace CappannaHelper.Api.Services
{
    public class ShiftManager : IShiftManager
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _configuration;

        public ShiftManager(ApplicationDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public async Task<Shift> GetOrCreateCurrentAsync()
        {
            var shiftId = _configuration.GetValue<int>("ShiftId");
            var result = await _context.Shifts.SingleOrDefaultAsync(e => e.Id == shiftId);

            if (result == null)
            {
                var now = DateTime.Now;
                result = new Shift
                {
                    OpenTimestamp = now,
                    Description = $"{now:dddd} - {(now.Hour < 17 ? "Pranzo" : "Cena")}"
                };
                await _context.Shifts.AddAsync(result);
                await _context.SaveChangesAsync();
            }

            return result;
        }
    }
}
