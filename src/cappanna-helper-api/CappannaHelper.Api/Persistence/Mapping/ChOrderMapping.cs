using CappannaHelper.Api.Common.DataModel.Mapping;
using CappannaHelper.Api.Persistence.Modelling;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CappannaHelper.Api.Persistence.Mapping
{
    public class ChOrderMapping : EntityMapping<ChOrder>
    {
        public ChOrderMapping(ModelBuilder builder)
            : base(builder)
        { }

        protected override void BuildEntityConfiguration(EntityTypeBuilder<ChOrder> entityBuilder)
        {
            entityBuilder.ToTable("ChOrders");
            
            entityBuilder.Property(o => o.Id).IsRequired().ValueGeneratedOnAdd();
            entityBuilder.Property(o => o.ChTable).HasMaxLength(50).IsRequired();
            entityBuilder.Property(o => o.Seats).IsRequired().HasDefaultValue(2);
            entityBuilder.Property(o => o.CreationTimestamp).IsRequired().HasDefaultValueSql("CURRENT_TIMESTAMP");
            entityBuilder.Property(o => o.Status).IsRequired().HasDefaultValue(1);
            entityBuilder.HasMany(o => o.Details).WithOne().HasForeignKey(d => d.OrderId).IsRequired();
            entityBuilder.HasOne(o => o.CreatedBy).WithMany().HasForeignKey(o => o.CreatedById).IsRequired();
            entityBuilder.Property(o => o.Notes).HasMaxLength(-1);
            entityBuilder.HasMany(o => o.Operations).WithOne().HasForeignKey(d => d.OrderId).IsRequired();

            entityBuilder.HasIndex(o => o.CreationTimestamp);
            entityBuilder.HasIndex(o => o.Status);
        }
    }
}