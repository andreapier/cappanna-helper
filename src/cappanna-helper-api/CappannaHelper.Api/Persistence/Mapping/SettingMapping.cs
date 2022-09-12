using CappannaHelper.Api.Common.DataModel.Mapping;
using CappannaHelper.Api.Persistence.Modelling;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CappannaHelper.Api.Persistence.Mapping
{
    public class SettingMapping : EntityMapping<Setting>
    {
        public SettingMapping(ModelBuilder builder)
            : base(builder) { }

        protected override void BuildEntityConfiguration(EntityTypeBuilder<Setting> entityBuilder)
        {
            entityBuilder.ToTable("Settings");

            entityBuilder.Property(o => o.Id).IsRequired().ValueGeneratedOnAdd();
            entityBuilder.Property(o => o.Name).HasMaxLength(50).IsRequired();
            entityBuilder.Property(o => o.Type).HasMaxLength(50).IsRequired();
            entityBuilder.Property(o => o.Value).HasMaxLength(2048).IsRequired();

            entityBuilder.HasIndex(o => o.Name).IsUnique();
        }
    }
}
