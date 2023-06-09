using CappannaHelper.Api.Common.DataModel.Mapping;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CappannaHelper.Api.Identity.DataModel.Mapping
{
    public class UserLoginMapping : EntityMapping<IdentityUserLogin<int>>
    {
        public UserLoginMapping(ModelBuilder builder)
            : base(builder)
        { }

        protected override void BuildEntityConfiguration(EntityTypeBuilder<IdentityUserLogin<int>> entityBuilder)
        {
            entityBuilder.ToTable("UserLogins");
        }
    }
}