using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace CappannaHelper.Common.Services.Extensions;

public static class BaseServiceWebBuilderExtensions
{
    public static WebApplicationBuilder AddBaseServices(this WebApplicationBuilder builder)
    {
        builder.Services.AddScoped(typeof(IService<>), typeof(BaseService<>));

        return builder;
    }
}
