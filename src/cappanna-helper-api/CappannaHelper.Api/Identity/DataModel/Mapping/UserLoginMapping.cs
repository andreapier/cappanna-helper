using CappannaHelper.Api.Common.DataModel.Mapping;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CappannaHelper.Api.Persistence.Mapping
{
    public class UserLoginMapping : BaseMapping<IdentityUserLogin<int>>
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