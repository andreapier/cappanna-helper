using CappannaHelper.Api.Identity.ComponentModel.SignIn;
using CappannaHelper.Api.Identity.ComponentModel.User;
using CappannaHelper.Api.Identity.DataModel;
using CappannaHelper.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace CappannaHelper.Api.Controllers
{
    [Route("api/[controller]")]
    public class AccountController : Controller
    {
        private readonly IApplicationUserManager _userManager;
        private readonly IApplicationSignInManager _signInManager;

        public AccountController(IApplicationUserManager userManager, IApplicationSignInManager signInManager)
        {
            _userManager = userManager ?? throw new ArgumentNullException(nameof(userManager));
            _signInManager = signInManager ?? throw new ArgumentNullException(nameof(signInManager));
        }

        [HttpPost("register")]
        [Authorize]
        public async Task<IActionResult> Register([FromBody] UserRegistrationModel model)
        {
            var user = new ApplicationUser
            {
                UserName = model.Email,
                Email = model.Email,
                FirstName = model.FirstName,
                Surname = model.LastName
            };
            var result = await _userManager.CreateAsync(user, model.Password);
            
            if (!result.Succeeded)
            {
                throw new Exception(string.Join("\n", result.Errors.Select(e => e.Description)));
            }

            await _signInManager.SignInAsync(user, true);
            user = await _userManager.FindByNameAsync(user.UserName);
            
            return Ok(user);
        }

        [HttpPost("signin")]
        public async Task<IActionResult> Signin([FromBody] SigninData loginData)
        {
            var user = await _userManager.FindByNameAsync(loginData.Username);

            if (user == null)
            {
                return NotFound();
            }

            var result = await _signInManager.PasswordSignInAsync(user, loginData.Password, loginData.RememberMe, true);

            if (result.Succeeded)
            {
                return Ok(user);
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
    }
}
