using CappannaHelper.Api.Common.DataModel.Mapping;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CappannaHelper.Api.Persistence.Mapping
{
    public class UserTokenMapping : BaseMapping<IdentityUserToken<int>>
    {
        public UserTokenMapping(ModelBuilder builder)
            : base(builder)
        { }

        protected override void BuildEntityConfiguration(EntityTypeBuilder<IdentityUserToken<int>> entityBuilder)
        {
            entityBuilder.ToTable("UserTokens");
        }
    }
}