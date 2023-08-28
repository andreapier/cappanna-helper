using CappannaHelper.Common.Utils;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace CappannaHelper.Common.Persistence.Seeding.Extensions;

public static class SeedWebApplicationBuilderExtensions
{
    public static WebApplicationBuilder AddBaseSeeds(this WebApplicationBuilder builder)
    {
        builder.Services.Configure<SeedOptions>(builder.Configuration.GetSection("Seeds"));
        builder.AddSeedUnits();
        builder.Services.AddScoped<ISeedUnitRunner, BaseSeedUnitRunner>();

        return builder;
    }

    private static WebApplicationBuilder AddSeedUnits(this WebApplicationBuilder builder)
    {
        var seedUnitType = typeof(ISeedUnit);
        var seedUnits = seedUnitType.GetImplementations();

        foreach (var seedUnit in seedUnits)
        {
            builder.Services.AddScoped(seedUnitType, seedUnit);
        }

        return builder;
    }
}