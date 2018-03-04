using CappannaHelper.Api.Identity.ComponentModel.SignIn;
using CappannaHelper.Api.Identity.ComponentModel.User;
using Microsoft.Extensions.DependencyInjection;

namespace CappannaHelper.Api.Identity.Extensions
{
    public static class ApplicationIdentityServiceCollectionExtensions
    {
        public static void AddApplicationIdentity(this IServiceCollection services)
        {
            services.AddScoped<IApplicationUserManager, ApplicationUserManager>();
            services.AddScoped<IApplicationSignInManager, ApplicationSignInManager>();
        }
    }
}
