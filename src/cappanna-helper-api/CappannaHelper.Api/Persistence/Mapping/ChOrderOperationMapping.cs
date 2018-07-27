using CappannaHelper.Api.Common.DataModel.Mapping;
using CappannaHelper.Api.Persistence.Modelling;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CappannaHelper.Api.Persistence.Mapping
{
    public class ChOrderOperationMapping : EntityMapping<ChOrderOperation>
    {
        public ChOrderOperationMapping(ModelBuilder builder)
            : base(builder)
        { }

        protected override void BuildEntityConfiguration(EntityTypeBuilder<ChOrderOperation> entityBuilder)
        {
            entityBuilder.ToTable("ChOrderOperations");

            entityBuilder.Property(o => o.Id).IsRequired().ValueGeneratedOnAdd();
            entityBuilder.Property(o => o.OrderId).IsRequired();
            entityBuilder.Property(o => o.TypeId).IsRequired();
            entityBuilder.Property(o => o.OperationTimestamp).IsRequired().HasDefaultValueSql("CURRENT_TIMESTAMP");
            entityBuilder.HasOne(o => o.Type).WithMany().HasForeignKey(o => o.TypeId).IsRequired();
            entityBuilder.HasOne(o => o.User).WithMany().HasForeignKey(o => o.UserId).IsRequired();
        }
    }
}
