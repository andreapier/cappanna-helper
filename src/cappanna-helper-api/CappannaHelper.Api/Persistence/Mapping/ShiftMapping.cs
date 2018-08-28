using CappannaHelper.Api.Common.DataModel.Mapping;
using CappannaHelper.Api.Persistence.Modelling;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CappannaHelper.Api.Persistence.Mapping
{
    public class ShiftMapping : EntityMapping<Shift>
    {
        public ShiftMapping(ModelBuilder builder)
            : base(builder)
        { }

        protected override void BuildEntityConfiguration(EntityTypeBuilder<Shift> entityBuilder)
        {
            entityBuilder.ToTable("Shifts");

            entityBuilder.Property(o => o.Id).IsRequired().ValueGeneratedOnAdd();
            entityBuilder.Property(o => o.OpenTimestamp).IsRequired().HasDefaultValueSql("CURRENT_TIMESTAMP");
            entityBuilder.Property(o => o.Description).HasMaxLength(100).IsRequired();
            entityBuilder.Property(o => o.OrderCounter).IsRequired().HasDefaultValue(0);
            entityBuilder.Property(o => o.Income).IsRequired().HasDefaultValue(0);

            entityBuilder.HasIndex(o => o.OpenTimestamp);
        }
    }
}
