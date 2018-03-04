using CappannaHelper.Api.Common.DataModel.Mapping;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CappannaHelper.Api.Persistence.Mapping
{
    public class UserRoleMapping : BaseMapping<IdentityUserRole<int>>
    {
        public UserRoleMapping(ModelBuilder builder)
            : base(builder)
        { }

        protected override void BuildEntityConfiguration(EntityTypeBuilder<IdentityUserRole<int>> entityBuilder)
        {
            entityBuilder.ToTable("UserRoles");
        }
    }
}