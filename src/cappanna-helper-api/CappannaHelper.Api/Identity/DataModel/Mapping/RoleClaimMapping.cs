using CappannaHelper.Api.Common.DataModel.Mapping;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CappannaHelper.Api.Persistence.Mapping
{
    public class RoleClaimMapping : BaseMapping<IdentityRoleClaim<int>>
    {
        public RoleClaimMapping(ModelBuilder builder)
            : base(builder)
        { }

        protected override void BuildEntityConfiguration(EntityTypeBuilder<IdentityRoleClaim<int>> entityBuilder)
        {
            entityBuilder.ToTable("RoleClaims");
        }
    }
}