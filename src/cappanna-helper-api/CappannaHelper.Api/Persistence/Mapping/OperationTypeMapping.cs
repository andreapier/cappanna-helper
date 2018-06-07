using CappannaHelper.Api.Common.DataModel.Mapping;
using CappannaHelper.Api.Persistence.Modelling;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CappannaHelper.Api.Persistence.Mapping
{
    public class OperationTypeMapping : EntityMapping<OperationType>
    {
        public OperationTypeMapping(ModelBuilder builder)
            : base(builder)
        { }

        protected override void BuildEntityConfiguration(EntityTypeBuilder<OperationType> entityBuilder)
        {
            entityBuilder.ToTable("OperationTypes");

            entityBuilder.HasKey(o => o.Id);
            entityBuilder.Property(o => o.Id).IsRequired();
            entityBuilder.Property(o => o.Description).HasMaxLength(200).IsRequired();
        }
    }
}
