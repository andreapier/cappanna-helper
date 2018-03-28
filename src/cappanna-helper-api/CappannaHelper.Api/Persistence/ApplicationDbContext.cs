using CappannaHelper.Api.Identity.DataModel;
using CappannaHelper.Api.Identity.Extensions;
using CappannaHelper.Api.Persistence.Modelling;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace CappannaHelper.Api.Persistence
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser, ApplicationRole, int, IdentityUserClaim<int>, ApplicationUserRole, IdentityUserLogin<int>, ApplicationRoleClaim, IdentityUserToken<int>>
    {
        public DbSet<ChOrder> Orders { get; set; }
        public DbSet<MenuDetail> MenuDetails { get; set; }

        public ApplicationDbContext()
        { }

        public ApplicationDbContext(DbContextOptions options)
            : base(options)
        { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder
                .MapIdentityEntities();
            //.MapOrderEntities();

            //modelBuilder.Seed();
        }
    }
}