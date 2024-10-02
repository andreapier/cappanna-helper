using CappannaHelper.Api.Identity.DataModel;
using CappannaHelper.Api.Identity.Extensions;
using CappannaHelper.Api.Persistence.Mapping;
using CappannaHelper.Api.Persistence.Modelling;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace CappannaHelper.Api.Persistence
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser, ApplicationRole, int, IdentityUserClaim<int>, ApplicationUserRole, IdentityUserLogin<int>, ApplicationRoleClaim, IdentityUserToken<int>>
    {
        public DbSet<ChOrder> Orders { get; set; }
        public DbSet<OrderDetail> OrderDetails { get; set; }
        public DbSet<MenuDetail> MenuDetails { get; set; }
        public DbSet<Shift> Shifts { get; set; }
        public DbSet<Setting> Settings { get; set; }
        public DbSet<Stand> Stands { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder
                .MapIdentityEntities()
                .MapOrderEntities();

            if (Database.ProviderName == "Microsoft.EntityFrameworkCore.Sqlite")
            {
                foreach (var entityType in builder.Model.GetEntityTypes())
                {
                    var properties = entityType.ClrType.GetProperties().Where(p => p.PropertyType == typeof(decimal));

                    foreach (var property in properties)
                    {
                        builder.Entity(entityType.Name).Property(property.Name).HasConversion<double>();
                    }
                }
            }
        }
    }
}