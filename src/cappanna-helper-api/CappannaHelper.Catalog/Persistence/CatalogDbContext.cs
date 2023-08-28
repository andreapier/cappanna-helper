using CappannaHelper.Catalog.Persistence.Model;
using Microsoft.EntityFrameworkCore;

namespace CappannaHelper.Catalog.Persistence;

public class CatalogDbContext : DbContext
{
    public CatalogDbContext(DbContextOptions<CatalogDbContext> options) :
        base(options)
    { }

    public DbSet<Product> Products { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        var productConfiguration = modelBuilder.Entity<Product>();

        productConfiguration.HasIndex(p => p.Name).IsUnique();
        productConfiguration.HasIndex(p => p.Group);
    }
}
