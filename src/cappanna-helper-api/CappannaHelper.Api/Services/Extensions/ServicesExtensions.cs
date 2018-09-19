using Microsoft.Extensions.DependencyInjection;

namespace CappannaHelper.Api.Services.Extensions
{
    public static class ServicesExtensions
    {
        public static IServiceCollection AddChServices(this IServiceCollection services)
        {
            return services
                .AddScoped<IShiftManager, ShiftManager>()
                .AddScoped<ISettingManager, SettingManager>();
        }
    }
}
