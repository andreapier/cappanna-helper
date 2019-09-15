using CappannaHelper.Api.Common.DataModel.Mapping;
using CappannaHelper.Api.Persistence.Modelling;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CappannaHelper.Api.Identity.DataModel.Mapping
{
    public class ApplicationUserMapping : EntityMapping<ApplicationUser>
    {
        public ApplicationUserMapping(ModelBuilder builder)
            : base(builder)
        { }

        protected override void BuildEntityConfiguration(EntityTypeBuilder<ApplicationUser> entityBuilder)
        {
            entityBuilder.ToTable("Users");

            entityBuilder.Property(u => u.FirstName).IsRequired().HasMaxLength(100);
            entityBuilder.Property(u => u.Surname).IsRequired().HasMaxLength(100);
            entityBuilder.Property(u => u.SettingsId).IsRequired();

            entityBuilder.HasMany(u => u.UserRoles).WithOne().HasForeignKey(ur => ur.UserId).IsRequired();
            entityBuilder.HasOne(u => u.Settings).WithOne().HasForeignKey<ApplicationUser>(u => u.SettingsId).IsRequired();
        }
    }
}