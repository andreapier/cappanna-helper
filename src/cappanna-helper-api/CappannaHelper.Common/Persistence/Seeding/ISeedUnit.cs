
using Microsoft.EntityFrameworkCore;

namespace CappannaHelper.Common.Persistence.Seeding;

public interface ISeedUnit
{
    Task SeedAsync();
}