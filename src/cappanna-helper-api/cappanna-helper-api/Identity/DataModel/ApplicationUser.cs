using Microsoft.AspNetCore.Identity;

namespace CappannaHelper.Api.Identity.DataModel
{
    public class ApplicationUser : IdentityUser<int>
    {
        public string FirstName { get; set; }
        public string Surname { get; set; }
    }
}