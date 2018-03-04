using CappannaHelper.Api.Common.DataModel.Mapping;
using CappannaHelper.Api.Persistence.Modelling;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CappannaHelper.Api.Persistence.Mapping
{
    public class MenuDetailMapping : BaseMapping<MenuDetail>
    {
        public MenuDetailMapping(ModelBuilder builder)
            : base(builder)
        { }

        protected override void BuildEntityConfiguration(EntityTypeBuilder<MenuDetail> entityBuilder)
        {
            entityBuilder.ToTable("MenuDetails");
            
            entityBuilder.Property(u => u.Id).IsRequired().ValueGeneratedOnAdd();
            entityBuilder.Property(u => u.Price).IsRequired();
            entityBuilder.Property(u => u.Group).HasMaxLength(50).IsRequired();
            entityBuilder.Property(u => u.Name).HasMaxLength(200).IsRequired();
            entityBuilder.Property(u => u.IsAvailable).IsRequired();
        }
    }
}