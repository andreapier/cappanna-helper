using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace CappannaHelper.Common.Persistence.Seeding;

public class BaseSeedUnitRunner : ISeedUnitRunner
{
    private readonly ILogger<BaseSeedUnitRunner> _logger;
    private readonly IOptions<SeedOptions> _seedOptions;
    private readonly IEnumerable<ISeedUnit> _seeds;

    public BaseSeedUnitRunner(
        ILogger<BaseSeedUnitRunner> logger
        , IOptions<SeedOptions> seedOptions
        , IEnumerable<ISeedUnit> seeds)
    {
        _logger = logger;
        _seedOptions = seedOptions;
        _seeds = seeds;
    }

    public async Task SeedAsync()
    {
        if (_seedOptions.Value.Enabled)
        {
            _logger.LogInformation("Seeding DB...");
            foreach (var seed in _seeds)
            {
                _logger.LogInformation("Seeding DB -> Seed {seed}...", seed.GetType().FullName);
                await seed.SeedAsync();
                _logger.LogInformation("Seeding DB -> Seed {seed} OK", seed.GetType().FullName);
            }
            _logger.LogInformation("Seeding DB OK");
        }
        else
        {
            _logger.LogDebug("Seeding DB Skipped (disabled from config)");
        }
    }
}
