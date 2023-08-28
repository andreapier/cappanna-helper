using CappannaHelper.Common.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace CappannaHelper.Tenant.Persistence;

public class AppDbContext : BaseDbContext
{
    public AppDbContext(
        DbContextOptions options
        , ILogger<AppDbContext> logger
        , IOptions<PersistenceOptions> seedOptions)
        : base(options, logger, seedOptions)
    { }

    public DbSet<TenantEntity> Tenants { get; set; } = null!;
}
