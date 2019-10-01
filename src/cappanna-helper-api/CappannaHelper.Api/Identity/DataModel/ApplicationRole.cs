using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace CappannaHelper.Api.Identity.DataModel
{
    public class ApplicationRole : IdentityRole<int>
    {
        public const string APPLICATION_ROLE_ADMIN = "admin";
        public const string APPLICATION_ROLE_WAITER = "waiter";
        public const string APPLICATION_ROLE_DOME = "dome";
        public const string APPLICATION_ROLE_CASHIER = "cashier";

        public ICollection<ApplicationRoleClaim> Claims { get; private set; }

        public ApplicationRole()
        {
            Claims = new HashSet<ApplicationRoleClaim>();
        }
    }
}