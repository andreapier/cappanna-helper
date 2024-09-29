using CappannaHelper.Api.Identity.ComponentModel.SignIn;
using CappannaHelper.Api.Identity.ComponentModel.User;
using CappannaHelper.Api.Identity.DataModel;
using CappannaHelper.Api.Models;
using CappannaHelper.Api.Persistence;
using CappannaHelper.Api.Persistence.Modelling;
using CappannaHelper.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
    [ApiController]
    public class AccountController : Controller
    {
        private readonly IApplicationUserManager _userManager;
        private readonly IApplicationSignInManager _signInManager;
        private readonly ApplicationDbContext _context;
        private readonly IShiftManager _shiftManager;
        private readonly IConfiguration _configuration;

        public AccountController(
            IApplicationUserManager userManager,
            IApplicationSignInManager signInManager,
            ApplicationDbContext context,
            IShiftManager shiftManager,
            IConfiguration configuration)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _context = context;
            _shiftManager = shiftManager;
            _configuration = configuration;
        }

        [HttpPost("signup")]
        [Authorize]
        public async Task<IActionResult> Signup([FromBody] SignupModel model)
        {
            var transaction = await _context.Database.BeginTransactionAsync();
            var user = new ApplicationUser
            {
                UserName = model.Username,
                FirstName = model.FirstName,
                Surname = model.LastName,
                Settings = new UserSetting
                {
                    StandId = model.StandId
                },
            };
            var result = await _userManager.CreateAsync(user, model.Password);

            if (!result.Succeeded)
            {
                await transaction.RollbackAsync();
                throw new Exception(string.Join("\n", result.Errors.Select(e => e.Description)));
            }

            user = await _userManager.FindByNameAsync(user.UserName);
            await transaction.CommitAsync();
            
            return Ok(user);
        }

        [HttpPost("signin")]
        public async Task<IActionResult> Signin([FromBody] SigninModel signinData)
        {
            if (signinData == null)
            {
                return BadRequest(new
                {
                    Message = "Nome utente o password non validi"
                });
            }

            var user = await _userManager.FindByNameAsync(signinData.Username);
            if (user == null)
            {
                return BadRequest(new
                {
                    Message = "Nome utente o password non validi",
                });
            }

            var signInResult = await _signInManager.PasswordSignInAsync(user, signinData.Password, signinData.RememberMe, true);

            if (signInResult.Succeeded)
            {
                var shift = await _shiftManager.GetCurrentAsync();
                var jwt = GenerateJwtToken(user, shift);
                return Ok(new SigninResultModel
                {
                    UserId = user.Id,
                    Username = user.UserName,
                    Roles = user.UserRoles.Select(ur => ur.Role).Select(r => r.Name),
                    Token = jwt,
                    Settings = user.Settings,
                });
            }
            
            if (signInResult.IsLockedOut)
            {
                return new StatusCodeResult(429);
            }

            if (signInResult.IsNotAllowed)
            {
                return Unauthorized();
            }

            return BadRequest(new
            {
                Message = "Nome utente o password non validi",
            });
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
            var result = await _context.Users.ToListAsync();
            return Ok(result);
        }

        private string GenerateJwtToken(ApplicationUser user, Shift shift)
        {
            var claims = new List<Claim>
            {
                new(JwtRegisteredClaimNames.Sub, user.UserName),
                new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new(ClaimTypes.NameIdentifier, user.Id.ToString()),
            };

            foreach (var role in user.UserRoles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role.Role.Name));
            }

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtKey"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expires = shift.CloseTimestamp;

            var token = new JwtSecurityToken(
                _configuration["JwtIssuer"],
                _configuration["JwtAudience"],
                claims,
                expires: expires,
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
