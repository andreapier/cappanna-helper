using System.ComponentModel.DataAnnotations;

namespace CappannaHelper.Api.Models
{
    public class SignupModel
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        [Compare("Password")]
        public string ConfirmPassword { get; set; }

        [Required]
        [StringLength(200)]
        public string FirstName { get; set; }
        
        [Required]
        [StringLength(200)]
        public string LastName { get; set; }

        [Required]
        public int StandId { get; set; }
    }
}