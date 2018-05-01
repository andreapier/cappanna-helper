using CappannaHelper.Api.Common.DataModel.Mapping;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CappannaHelper.Api.Identity.DataModel.Mapping
{
    public class ApplicationRoleMapping : EntityMapping<ApplicationRole>
    {
        public ApplicationRoleMapping(ModelBuilder builder)
            : base(builder)
        { }

        protected override void BuildEntityConfiguration(EntityTypeBuilder<ApplicationRole> entityBuilder)
        {
            entityBuilder.ToTable("Roles");

            entityBuilder.HasMany(r => r.UserRoles).WithOne(ur => ur.Role).HasForeignKey(c => c.RoleId);
            entityBuilder.HasMany(r => r.Claims).WithOne().HasForeignKey(c => c.RoleId);
        }
    }
}