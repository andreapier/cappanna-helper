using System.Collections.Generic;

namespace CappannaHelper.Api.Models
{
    public class SigninResultModel
    {
        public string Username { get; set; }
        public string Token { get; set; }
        public IEnumerable<string> Roles { get; set; } = new List<string>();
    }
}
