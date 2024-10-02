using CappannaHelper.Api.Identity.DataModel;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;

namespace CappannaHelper.Api.Identity.ComponentModel.SignIn
{
    public class ApplicationSignInManager : IApplicationSignInManager
    {
        private readonly SignInManager<ApplicationUser> _signInManager;

        public ApplicationSignInManager(SignInManager<ApplicationUser> signInManager)
        {
            _signInManager = signInManager;
        }

        public async Task SignInAsync(ApplicationUser user, bool isPersistent, string authenticationMethod = null) => await _signInManager.SignInAsync(user, isPersistent, authenticationMethod);

        public async Task<SignInResult> PasswordSignInAsync(ApplicationUser user, string password, bool isPersistent) => await _signInManager.PasswordSignInAsync(user, password, isPersistent, false);

        public async Task SignOutAsync() => await _signInManager.SignOutAsync();
    }
}