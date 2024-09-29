using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;

namespace CappannaHelper.Api.Identity.ComponentModel.SignIn
{
    public interface ISignInManager<TUser> where TUser : class
    {
        Task SignInAsync(TUser user, bool isPersistent, string authenticationMethod = null);
        Task<SignInResult> PasswordSignInAsync(TUser user, string password, bool isPersistent);
        Task SignOutAsync();
    }
}