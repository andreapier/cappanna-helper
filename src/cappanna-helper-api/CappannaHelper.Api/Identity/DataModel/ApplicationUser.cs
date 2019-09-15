using CappannaHelper.Api.Persistence.Modelling;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace CappannaHelper.Api.Identity.DataModel
{
    public class ApplicationUser : IdentityUser<int>
    {
        public string FirstName { get; set; }
        public string Surname { get; set; }

        public ICollection<ApplicationUserRole> UserRoles { get; private set; }

        public int SettingsId { get; set; }
        public UserSetting Settings { get; set; }

        public ApplicationUser()
        {
            UserRoles = new HashSet<ApplicationUserRole>();
        }
    }
}