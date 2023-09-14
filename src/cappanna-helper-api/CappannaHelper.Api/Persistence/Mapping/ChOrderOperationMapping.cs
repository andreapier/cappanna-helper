using System;
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
            entityBuilder.Property(o => o.Type).IsRequired();
            entityBuilder.Property(o => o.OperationTimestamp)
                .IsRequired()
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasConversion(v => v, v => DateTime.SpecifyKind(v, DateTimeKind.Utc));
            entityBuilder.HasOne(o => o.User).WithMany().HasForeignKey(o => o.UserId).IsRequired();
        }
    }
}
