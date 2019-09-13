using CappannaHelper.Api.Common.DataModel.Mapping;
using CappannaHelper.Api.Identity.DataModel;
using CappannaHelper.Api.Persistence.Modelling;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CappannaHelper.Api.Persistence.Mapping
{
    public class UserSettingMapping : EntityMapping<UserSetting>
    {
        public UserSettingMapping(ModelBuilder builder)
            : base(builder) { }

        protected override void BuildEntityConfiguration(EntityTypeBuilder<UserSetting> entityBuilder)
        {
            entityBuilder.ToTable("UserSettings");

            entityBuilder.Property(o => o.Id).IsRequired().ValueGeneratedOnAdd();
            entityBuilder.Property(o => o.Name).HasMaxLength(50).IsRequired();
            entityBuilder.Property(o => o.Type).HasMaxLength(50).IsRequired();
            entityBuilder.Property(o => o.Value).HasMaxLength(-1).IsRequired();
            entityBuilder.Property(o => o.UserId).IsRequired();

            entityBuilder.HasOne<ApplicationUser>().WithMany(u => u.Settings).HasForeignKey(s => s.UserId).IsRequired();

            entityBuilder.HasIndex(o => o.Name).IsUnique();
        }
    }
}
