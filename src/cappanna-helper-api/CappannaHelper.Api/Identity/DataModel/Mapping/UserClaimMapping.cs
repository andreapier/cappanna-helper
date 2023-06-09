using CappannaHelper.Api.Common.DataModel.Mapping;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CappannaHelper.Api.Identity.DataModel.Mapping
{
    public class UserClaimMapping : EntityMapping<IdentityUserClaim<int>>
    {
        public UserClaimMapping(ModelBuilder builder)
            : base(builder)
        { }

        protected override void BuildEntityConfiguration(EntityTypeBuilder<IdentityUserClaim<int>> entityBuilder)
        {
            entityBuilder.ToTable("UserClaims");
        }
    }
}