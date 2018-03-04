using CappannaHelper.Api.Identity.DataModel;
using Microsoft.AspNetCore.Identity;
using System;
using System.Threading.Tasks;

namespace CappannaHelper.Api.Identity.ComponentModel.User
{
    public class ApplicationUserManager : IApplicationUserManager
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public ApplicationUserManager(UserManager<ApplicationUser> userManager)
        {
            if (userManager == null)
            {
                throw new ArgumentNullException(nameof(userManager));
            }

            _userManager = userManager;
        }

        public async Task<IdentityResult> CreateAsync(ApplicationUser user, string password) => await _userManager.CreateAsync(user, password);

        public async Task<ApplicationUser> FindByNameAsync(string userName) => await _userManager.FindByNameAsync(userName);
    }
}