using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace CappannaHelper.Api.Setup.Extensions
{
    public static class SetupMiddlewareExtensions
    {
        public static IServiceCollection AddSetup(this IServiceCollection services)
        {
            return services
                .AddTransient<ISetupHelper, SetupHelper>()
                .AddTransient<SetupMiddleware>();
        }

        public static IApplicationBuilder UseSetupMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<SetupMiddleware>();
        }
    }
}
