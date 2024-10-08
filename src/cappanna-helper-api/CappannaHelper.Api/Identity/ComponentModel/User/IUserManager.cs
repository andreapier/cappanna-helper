using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;

namespace CappannaHelper.Api.Identity.ComponentModel.User
{
    public interface IUserManager<TUser> where TUser : class
    {
        Task<IdentityResult> CreateAsync(TUser user, string password);
        Task<TUser> FindByNameAsync(string userName);
    }
}