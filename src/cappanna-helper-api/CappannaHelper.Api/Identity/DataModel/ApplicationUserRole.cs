using Microsoft.AspNetCore.Identity;

namespace CappannaHelper.Api.Identity.DataModel
{
    public class ApplicationUserRole : IdentityUserRole<int>
    {
        public ApplicationRole Role { get; set; }
    }
}
