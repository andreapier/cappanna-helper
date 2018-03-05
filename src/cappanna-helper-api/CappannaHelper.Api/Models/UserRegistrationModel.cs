using System.ComponentModel.DataAnnotations;

namespace CappannaHelper.Api.Models
{
    public class UserRegistrationModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        [StringLength(200)]
        public string FirstName { get; set; }
        
        [Required]
        [StringLength(200)]
        public string LastName { get; set; }
    }
}