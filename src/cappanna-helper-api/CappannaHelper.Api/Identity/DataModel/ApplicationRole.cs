using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace CappannaHelper.Api.Identity.DataModel
{
    public class ApplicationRole : IdentityRole<int>
    {
        public const string APPLICATION_ROLE_ADMIN = "admin";
        public const string APPLICATION_ROLE_WAITER = "waiter";

        public ICollection<ApplicationUserRole> UserRoles { get; private set; }
        public ICollection<ApplicationRoleClaim> Claims { get; private set; }

        public ApplicationRole()
        {
            UserRoles = new HashSet<ApplicationUserRole>();
            Claims = new HashSet<ApplicationRoleClaim>();
        }
    }
}