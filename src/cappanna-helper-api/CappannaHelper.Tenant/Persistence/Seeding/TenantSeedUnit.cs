using CappannaHelper.Common.Persistence.Seeding;
using Microsoft.EntityFrameworkCore;

namespace CappannaHelper.Tenant.Persistence.Seeding;

public class TenantSeedUnit : BaseIdempotentSeedUnit<TenantEntity, AppDbContext>
{
    public TenantSeedUnit(ILogger<TenantSeedUnit> logger, AppDbContext context)
        : base(logger, context)
    { }

    protected override async Task<TenantEntity> GetAsync(TenantEntity entity)
    {
        var fromDb = await _context.Tenants.SingleOrDefaultAsync(x => x.Name == entity.Name);
        return fromDb ?? entity;
    }

    protected override IEnumerable<TenantEntity> GetEntities()
    {
        yield return new TenantEntity
        {
            Name = "Cupra Baseball",
        };
    }

    protected override void Merge(TenantEntity fromDb, TenantEntity entity)
    { }
}
