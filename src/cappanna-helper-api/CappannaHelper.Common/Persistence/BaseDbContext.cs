using CappannaHelper.Common.Utils;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace CappannaHelper.Common.Persistence;

public class BaseDbContext : DbContext
{
    private readonly IOptions<PersistenceOptions> _persistenceOptions;

    protected readonly ILogger<BaseDbContext> _logger;

    public BaseDbContext(
        DbContextOptions options
        , ILogger<BaseDbContext> logger
        , IOptions<PersistenceOptions> persistenceOptions)
        : base(options)
    {
        _logger = logger;
        _persistenceOptions = persistenceOptions;
    }

    private void ConfigureModel(ModelBuilder modelBuilder)
    {
        _logger.LogDebug("Configuring DB model...");
        var assembliesWithConfiguration = typeof(IEntityTypeConfiguration<>).GetAssembliesWithImplementations();
        foreach (var assembly in assembliesWithConfiguration)
        {
            _logger.LogDebug("Registering configurations from assembly {assembly}", assembly.FullName);
            modelBuilder.ApplyConfigurationsFromAssembly(assembly);
        }
        _logger.LogDebug("Configuring DB model OK");
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        ConfigureModel(modelBuilder);

        if (_persistenceOptions.Value.Migrations.Enabled)
        {
            _logger.LogInformation("Migrating DB...");
            Database.Migrate();
            _logger.LogInformation("Migrating DB OK");
        }
        else
        {
            _logger.LogDebug("Migrating DB skipped (disabled from config)");
        }
    }
}
