using CappannaHelper.Common.Persistence.Model;
using Microsoft.Extensions.Logging;

namespace CappannaHelper.Common.Persistence.Seeding;

public abstract class BaseIdempotentSeedUnit<TEntity, TContext> : ISeedUnit
    where TEntity : BaseEntity
    where TContext : BaseDbContext
{
    protected readonly TContext _context;
    protected readonly ILogger<BaseIdempotentSeedUnit<TEntity, TContext>> _logger;

    protected BaseIdempotentSeedUnit(ILogger<BaseIdempotentSeedUnit<TEntity, TContext>> logger, TContext context)
    {
        _context = context;
        _logger = logger;
    }

    public virtual async Task SeedAsync()
    {
        _logger.LogDebug("Running Seed Unit... - {seed}", GetType().FullName);
        var entities = GetEntities().ToList();
        _logger.LogDebug("Entities to seed: {count}", entities.Count);

        foreach (var entity in entities)
        {
            var fromDb = await GetAsync(entity);

            if (fromDb != entity)
            {
                _logger.LogDebug("Merging entity {entity}", entity);
                Merge(fromDb, entity);
            }

            _logger.LogDebug("Updating entity {entity}", entity);
            await AddOrUpdateAsync(fromDb);
        }

        await _context.SaveChangesAsync();
        _logger.LogDebug("Running Seed Unit OK - {seed}", GetType().FullName);
    }

    protected abstract void Merge(TEntity fromDb, TEntity entity);

    protected abstract IEnumerable<TEntity> GetEntities();

    protected abstract Task<TEntity> GetAsync(TEntity entity);

    protected virtual async Task AddOrUpdateAsync(TEntity entity)
    {
        if (entity.Id == 0)
        {
            await _context.Set<TEntity>().AddAsync(entity);
        }
        else
        {
            _context.Set<TEntity>().Update(entity);
        }
    }
}
