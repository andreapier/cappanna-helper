using CappannaHelper.Api.Common.DataModel.Mapping;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CappannaHelper.Api.Identity.DataModel.Mapping
{
    public class ApplicationRoleClaimMapping : EntityMapping<ApplicationRoleClaim>
    {
        public ApplicationRoleClaimMapping(ModelBuilder builder)
            : base(builder)
        { }

        protected override void BuildEntityConfiguration(EntityTypeBuilder<ApplicationRoleClaim> entityBuilder)
        {
            entityBuilder.ToTable("RoleClaims");
        }
    }
}
