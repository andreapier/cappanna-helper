using CappannaHelper.Api.Common.DataModel.Mapping;
using CappannaHelper.Api.Identity.DataModel;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CappannaHelper.Api.Persistence.Mapping
{
    public class ApplicationUserMapping : BaseMapping<ApplicationUser>
    {
        public ApplicationUserMapping(ModelBuilder builder)
            : base(builder)
        { }

        protected override void BuildEntityConfiguration(EntityTypeBuilder<ApplicationUser> entityBuilder)
        {
            entityBuilder.ToTable("Users");
            entityBuilder.Property(o => o.FirstName).IsRequired().HasMaxLength(100);
            entityBuilder.Property(o => o.Surname).IsRequired().HasMaxLength(100);
        }
    }
}