using CappannaHelper.Api.Common.DataModel.Mapping;
using CappannaHelper.Api.Persistence.Modelling;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CappannaHelper.Api.Persistence.Mapping
{
    public class OrderDetailMapping : EntityMapping<OrderDetail>
    {
        public OrderDetailMapping(ModelBuilder builder)
            : base(builder)
        { }

        protected override void BuildEntityConfiguration(EntityTypeBuilder<OrderDetail> entityBuilder)
        {
            entityBuilder.ToTable("OrderDetails");
            
            entityBuilder.Property(d => d.Id).IsRequired().ValueGeneratedOnAdd();
            entityBuilder.Property(d => d.Quantity).IsRequired().HasDefaultValue(1);
            entityBuilder.Property(o => o.CreationTimestamp).IsRequired().HasDefaultValueSql("CURRENT_TIMESTAMP");
            entityBuilder.HasOne(d => d.Item).WithMany().HasForeignKey(d => d.ItemId).IsRequired();

            entityBuilder.HasIndex(o => new { o.OrderId, o.ItemId }).IsUnique();
        }
    }
}