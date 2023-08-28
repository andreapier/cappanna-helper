using CappannaHelper.Common.Communitation.Extensions;
using CappannaHelper.Common.Dtos.Extensions;
using CappannaHelper.Common.Persistence;
using CappannaHelper.Common.Persistence.Extensions;
using CappannaHelper.Common.Services.Extensions;
using CappannaHelper.Common.Validation.Extensions;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Serilog;

namespace CappannaHelper.Common.Extensions;

public static class WebApplicationBuilderExtensions
{
    public static WebApplicationBuilder ConfigureBaseApp<TContext>(this WebApplicationBuilder builder)
        where TContext : BaseDbContext
    {
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();
        builder.Host.UseSerilog((context, configuration) => configuration.ReadFrom.Configuration(context.Configuration));

        builder
            .AddBasePersistence<TContext>()
            .AddAppProfiles()
            .AddAppValidators()
            .AddBaseServices()
            .AddBaseMassTransit();

        return builder;
    }
}