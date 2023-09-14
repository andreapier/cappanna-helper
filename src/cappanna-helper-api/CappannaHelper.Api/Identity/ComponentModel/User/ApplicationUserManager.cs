using CappannaHelper.Api.Identity.DataModel;
using CappannaHelper.Api.Persistence;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace CappannaHelper.Api.Identity.ComponentModel.User
{
    public class ApplicationUserManager : IApplicationUserManager
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ApplicationDbContext _context;

        public ApplicationUserManager(UserManager<ApplicationUser> userManager, ApplicationDbContext context)
        {
            _userManager = userManager;
            _context = context;
        }

        public async Task<IdentityResult> CreateAsync(ApplicationUser user, string password)
        {
            var result = await _userManager.CreateAsync(user, password);
            await _userManager.AddToRoleAsync(user, "waiter");

            return result;
        }

        public async Task<ApplicationUser> FindByNameAsync(string userName)
        {
            var result = await _userManager.FindByNameAsync(userName);
            var userRoles = await _context.UserRoles
                .Where(ur => ur.UserId == result.Id)
                .Include(ur => ur.Role)
                .ToListAsync();
            result.Settings = await _context.Users.Select(u => u.Settings).FirstOrDefaultAsync(u => u.Id == result.Id);

            foreach (var userRole in userRoles)
            {
                result.UserRoles.Add(userRole);
            }

            return result;
        }
    }
}