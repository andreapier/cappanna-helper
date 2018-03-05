using Microsoft.EntityFrameworkCore;

namespace CappannaHelper.Api.Persistence.Mapping
{
    public static class IdentityModelBuilderExtensions
    {
        public static ModelBuilder MapIdentityEntities(this ModelBuilder builder) => builder
                .MapApplicationRole()
                .MapApplicationUser()
                .MapRoleClaim()
                .MapUserClaim()
                .MapUserLogin()
                .MapUserRole()
                .MapUserToken();

        public static ModelBuilder MapApplicationRole(this ModelBuilder builder)
        {
            var mapping = new ApplicationRoleMapping(builder);
            mapping.Build();
            return builder;
        }

        public static ModelBuilder MapApplicationUser(this ModelBuilder builder)
        {
            var mapping = new ApplicationUserMapping(builder);
            mapping.Build();
            return builder;
        }

        public static ModelBuilder MapRoleClaim(this ModelBuilder builder)
        {
            var mapping = new RoleClaimMapping(builder);
            mapping.Build();
            return builder;
        }

        public static ModelBuilder MapUserClaim(this ModelBuilder builder)
        {
            var mapping = new UserClaimMapping(builder);
            mapping.Build();
            return builder;
        }

        public static ModelBuilder MapUserLogin(this ModelBuilder builder)
        {
            var mapping = new UserLoginMapping(builder);
            mapping.Build();
            return builder;
        }

        public static ModelBuilder MapUserRole(this ModelBuilder builder)
        {
            var mapping = new UserRoleMapping(builder);
            mapping.Build();
            return builder;
        }

        public static ModelBuilder MapUserToken(this ModelBuilder builder)
        {
            var mapping = new UserTokenMapping(builder);
            mapping.Build();
            return builder;
        }
    }
}