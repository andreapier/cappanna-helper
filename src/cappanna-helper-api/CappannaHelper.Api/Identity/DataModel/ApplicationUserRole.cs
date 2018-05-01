using Microsoft.AspNetCore.Identity;

namespace CappannaHelper.Api.Identity.DataModel
{
    public class ApplicationUserRole : IdentityUserRole<int>
    {
        public ApplicationUser User { get; set; }
        public ApplicationRole Role { get; set; }
    }
}
