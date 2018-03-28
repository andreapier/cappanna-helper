using CappannaHelper.Api.Common.DataModel.Mapping;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CappannaHelper.Api.Identity.DataModel.Mapping
{
    public class ApplicationUserRoleMapping : EntityMapping<ApplicationUserRole>
    {
        public ApplicationUserRoleMapping(ModelBuilder builder)
            : base(builder)
        { }

        protected override void BuildEntityConfiguration(EntityTypeBuilder<ApplicationUserRole> entityBuilder)
        {
            entityBuilder.ToTable("UserRoles");
        }
    }
}