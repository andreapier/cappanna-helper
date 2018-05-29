using CappannaHelper.Api.Identity.ComponentModel.SignIn;
using CappannaHelper.Api.Identity.ComponentModel.User;
using CappannaHelper.Api.Identity.DataModel;
using CappannaHelper.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace CappannaHelper.Api.Controllers
{
    [Route("api/[controller]")]
    public class AccountController : Controller
    {
        private readonly IApplicationUserManager _userManager;
        private readonly IApplicationSignInManager _signInManager;
        private readonly IConfiguration _configuration;

        public AccountController(
            IApplicationUserManager userManager,
            IApplicationSignInManager signInManager,
            IConfiguration configuration)
        {
            _userManager = userManager ?? throw new ArgumentNullException(nameof(userManager));
            _signInManager = signInManager ?? throw new ArgumentNullException(nameof(signInManager));
            _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
        }

        [HttpPost("signup")]
        [Authorize]
        public async Task<IActionResult> Signup([FromBody] SignupModel model)
        {
            var user = new ApplicationUser
            {
                UserName = model.Username,
                FirstName = model.FirstName,
                Surname = model.LastName
            };
            var result = await _userManager.CreateAsync(user, model.Password);
            
            if (!result.Succeeded)
            {
                throw new Exception(string.Join("\n", result.Errors.Select(e => e.Description)));
            }

            user = await _userManager.FindByNameAsync(user.UserName);
            
            return Ok(user);
        }

        [HttpPost("signin")]
        public async Task<IActionResult> Signin([FromBody] SigninModel signinData)
        {
            var user = await _userManager.FindByNameAsync(signinData.Username);

            if (user == null)
            {
                return NotFound();
            }

            var result = await _signInManager.PasswordSignInAsync(user, signinData.Password, signinData.RememberMe, true);

            if (result.Succeeded)
            {
                var jwt = GenerateJwtToken(user);

                return Ok(new SigninResultModel
                {
                    UserId = user.Id,
                    Username = user.UserName,
                    Roles = user.UserRoles.Select(ur => ur.Role).Select(r => r.Name),
                    Token = jwt
                });
            }

            if (result.IsLockedOut)
            {
                return new StatusCodeResult(429);
            }

            if (result.IsNotAllowed)
            {
                return Unauthorized();
            }

            throw new NotImplementedException("Sign in result is not implemented (not 'Succeded', not 'IsLockedOut', not 'IsNotAllowed')");
        }

        [HttpPost("signout")]
        [Authorize]
        public async Task<IActionResult> Signout()
        {
            await _signInManager.SignOutAsync();

            return Ok();
        }

        private string GenerateJwtToken(ApplicationUser user)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtKey"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expires = DateTime.Now.AddDays(Convert.ToDouble(_configuration["JwtExpireDays"]));

            var token = new JwtSecurityToken(
                _configuration["JwtIssuer"],
                _configuration["JwtIssuer"],
                claims,
                expires: expires,
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
