using System;
using System.Threading.Tasks;
using CappannaHelper.Api.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CappannaHelper.Api.Services
{
    public class SettingManager : ISettingManager
    {
        private readonly ApplicationDbContext _context;

        public SettingManager(ApplicationDbContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public async Task<T> GetSettingValue<T>(string name)
        {
            var setting = await _context.Settings.SingleOrDefaultAsync(s => s.Name == name);

            if (setting==null)
            {
                return default(T);
            }

            return (T) Convert.ChangeType(setting.Value, typeof(T));
        }
    }
}
