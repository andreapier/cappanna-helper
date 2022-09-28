using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using CappannaHelper.Api.Identity.ComponentModel.SignIn;
using CappannaHelper.Api.Identity.ComponentModel.User;
using CappannaHelper.Api.Identity.DataModel;
using CappannaHelper.Api.Models;
using CappannaHelper.Api.Persistence;
using CappannaHelper.Api.Persistence.Modelling;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace CappannaHelper.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : Controller
    {
        private readonly IApplicationUserManager _userManager;
        private readonly IApplicationSignInManager _signInManager;
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _configuration;

        public AccountController(
            IApplicationUserManager userManager,
            IApplicationSignInManager signInManager,
            ApplicationDbContext context,
            IConfiguration configuration)
        {
            _userManager = userManager ?? throw new ArgumentNullException(nameof(userManager));
            _signInManager = signInManager ?? throw new ArgumentNullException(nameof(signInManager));
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
        }

        [HttpPost("signup")]
        [Authorize]
        public async Task<IActionResult> Signup([FromBody] SignupModel model)
        {
            ApplicationUser user;

            using (var transaction = await _context.Database.BeginTransactionAsync())
            {
                user = new ApplicationUser
                {
                    UserName = model.Username,
                    FirstName = model.FirstName,
                    Surname = model.LastName,
                    Settings = new UserSetting
                    {
                        StandId = model.StandId
                    }
                };
                var result = await _userManager.CreateAsync(user, model.Password);

                if (!result.Succeeded)
                {
                    throw new Exception(string.Join("\n", result.Errors.Select(e => e.Description)));
                }

                user = await _userManager.FindByNameAsync(user.UserName);
                transaction.Commit();
            }
            
            return Ok(user);
        }

        [HttpPost("signin")]
        public async Task<IActionResult> Signin([FromBody] SigninModel signinData)
        {
            if (signinData == null)
            {
                return BadRequest("Invalid data");
            }

            SigninResultModel result;

            using (var transaction = await _context.Database.BeginTransactionAsync())
            {
                var user = await _userManager.FindByNameAsync(signinData.Username);

                if (user == null)
                {
                    return NotFound();
                }

                var signInresult = await _signInManager.PasswordSignInAsync(user, signinData.Password, signinData.RememberMe, true);

                if (signInresult.Succeeded)
                {
                    var jwt = GenerateJwtToken(user);

                    result = new SigninResultModel
                    {
                        UserId = user.Id,
                        Username = user.UserName,
                        Roles = user.UserRoles.Select(ur => ur.Role).Select(r => r.Name),
                        Token = jwt,
                        Settings = user.Settings
                    };
                }
                else if (signInresult.IsLockedOut)
                {
                    return new StatusCodeResult(429);
                }
                else if (signInresult.IsNotAllowed)
                {
                    return Unauthorized();
                }
                else
                {
                    throw new NotImplementedException("Sign in result is not implemented (not 'Succeded', not 'IsLockedOut', not 'IsNotAllowed')");
                }

                transaction.Commit();
            }

            return Ok(result);
        }

        [HttpPost("signout")]
        [Authorize]
        public async Task<IActionResult> Signout()
        {
            await _signInManager.SignOutAsync();

            return Ok();
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> Get()
        {
            IList<ApplicationUser> result;

            using (var transaction = await _context.Database.BeginTransactionAsync())
            {
                result = await _context.Users.ToListAsync();
                transaction.Commit();
            }

            return Ok(result);
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
