using CappannaHelper.Common.Persistence.Filtering;
using CappannaHelper.Common.Persistence.Repository;
using CappannaHelper.Common.Persistence.Seeding.Extensions;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace CappannaHelper.Common.Persistence.Extensions;

public static class PersistenceWebApplicationBuilderExtensions
{
    public static WebApplicationBuilder AddBasePersistence<TDbContext>(this WebApplicationBuilder builder)
        where TDbContext : BaseDbContext
    {
        builder.Services.AddDbContext<TDbContext>(o => o.UseNpgsql(builder.Configuration.GetConnectionString(typeof(TDbContext).Name)));
        builder.Services.AddScoped<DbContext>(p => p.GetRequiredService<TDbContext>());
        builder.Services.AddScoped<BaseDbContext>(p => p.GetRequiredService<TDbContext>());
        builder.Services.Configure<PersistenceOptions>(builder.Configuration.GetSection("Persistence"));
        builder.Services.AddScoped<IExpressionBuilder, ExpressionBuilder>();
        builder.Services.AddScoped(typeof(IRepository<>), typeof(EfModelInspectionBaseRepository<>));
        builder.AddBaseSeeds();

        return builder;
    }
}