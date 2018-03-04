using CappannaHelper.Api.Identity.ComponentModel.SignIn;
using CappannaHelper.Api.Identity.ComponentModel.User;
using CappannaHelper.Api.Identity.DataModel;
using CappannaHelper.Api.Models;
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
            if (userManager == null)
            {
                throw new ArgumentNullException(nameof(userManager));
            }
            if (signInManager == null)
            {
                throw new ArgumentNullException(nameof(signInManager));
            }

            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpPost("register")]
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

            // For more information on how to enable account confirmation and password reset please visit http://go.microsoft.com/fwlink/?LinkID=532713
            // Send an email with this link
            //var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            //var callbackUrl = Url.Action("ConfirmEmail", "Account", new { userId = user.Id, code = code }, protocol: HttpContext.Request.Scheme);
            //await _emailSender.SendEmailAsync(model.Email, "Confirm your account",
            //    "Please confirm your account by clicking this link: <a href=\"" + callbackUrl + "\">link</a>");

            await _signInManager.SignInAsync(user, true);
            user = await _userManager.FindByNameAsync(user.UserName);
            
            return Ok(user);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginData loginData)
        {
            var user = await _userManager.FindByNameAsync(loginData.Username);
            var result = await _signInManager.PasswordSignInAsync(user, loginData.Password, true, true);

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

        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();

            return Ok();
        }
    }
}
