
using System.ComponentModel.DataAnnotations;

namespace CappannaHelper.Api.Models
{
    public class LoginData
    {
        [Required]
        [EmailAddress]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }
    }
}