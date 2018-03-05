using CappannaHelper.Api.Common.DataModel.Mapping;
using CappannaHelper.Api.Identity.DataModel;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CappannaHelper.Api.Persistence.Mapping
{
    public class ApplicationRoleMapping : BaseMapping<ApplicationRole>
    {
        public ApplicationRoleMapping(ModelBuilder builder)
            : base(builder)
        { }

        protected override void BuildEntityConfiguration(EntityTypeBuilder<ApplicationRole> entityBuilder)
        {
            entityBuilder.ToTable("Roles");
        }
    }
}