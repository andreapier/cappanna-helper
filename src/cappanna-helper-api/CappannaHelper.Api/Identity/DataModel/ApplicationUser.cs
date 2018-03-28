using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace CappannaHelper.Api.Identity.DataModel
{
    public class ApplicationUser : IdentityUser<int>
    {
        public string FirstName { get; set; }
        public string Surname { get; set; }

        public ICollection<ApplicationUserRole> UserRoles { get; private set; }

        public ApplicationUser()
        {
            UserRoles = new HashSet<ApplicationUserRole>();
        }
    }
}