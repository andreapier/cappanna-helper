
using System.ComponentModel.DataAnnotations;

namespace CappannaHelper.Api.Models
{
    public class SigninData
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }

        public bool RememberMe { get; set; }
    }
}