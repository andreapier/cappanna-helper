using CappannaHelper.Api.Identity.ComponentModel.User;
using CappannaHelper.Api.Identity.DataModel;
using CappannaHelper.Api.Persistence;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace CappannaHelper.Api.Controllers
{
    [Route("api/[controller]")]
    public class SetupController : Controller
    {
        private readonly RoleManager<ApplicationRole> _roleManager;
        private readonly IApplicationUserManager _userManager;
        private readonly ApplicationDbContext _context;

        public SetupController(RoleManager<ApplicationRole> roleManager, IApplicationUserManager userManager, ApplicationDbContext context)
        {
            _userManager = userManager ?? throw new ArgumentNullException(nameof(userManager));
            _roleManager = roleManager ?? throw new ArgumentNullException(nameof(roleManager));
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        [HttpPost]
        public async Task<IActionResult> Post()
        {
            var errors = new List<string>();

            errors.AddRange(await SetupAdminAsync());
            errors.AddRange(await SetupWaiterAsync());
            
            return Ok(errors);
        }

        [HttpDelete]
        public async Task<IActionResult> Delete()
        {
            _context.UserRoles.RemoveRange(_context.UserRoles);
            _context.RoleClaims.RemoveRange(_context.RoleClaims);
            _context.Roles.RemoveRange(_context.Roles);
            _context.Users.RemoveRange(_context.Users);

            await _context.SaveChangesAsync();

            return Ok();
        }

        private async Task<List<string>> SetupAdminAsync()
        {
            var errors = new List<string>();

            //Create role
            try
            {
                var role = new ApplicationRole
                {
                    Name = ApplicationRole.APPLICATION_ROLE_ADMIN
                };

                var result = await _roleManager.CreateAsync(role);

                if (!result.Succeeded)
                {
                    errors.AddRange(result.Errors.Select(e => e.Description));
                }

            }
            catch (Exception e)
            {
                errors.Add(e.Message);
            }

            //Create role claim
            try
            {
                var role = await _roleManager.FindByNameAsync(ApplicationRole.APPLICATION_ROLE_ADMIN);
                var result = await _roleManager.AddClaimAsync(role, new Claim(ClaimTypes.Name, ApplicationRoleClaim.CLAIM_VALUE_ADMIN));

                if (!result.Succeeded)
                {
                    errors.AddRange(result.Errors.Select(e => e.Description));
                }
            }
            catch (Exception e)
            {
                errors.Add(e.Message);
            }

            //Create user
            try
            {
                var user = new ApplicationUser
                {
                    UserName = "admin",
                    Email = "admin@cappannahelper.it",
                    FirstName = "Admin",
                    Surname = "Admin"
                };
                var role = await _roleManager.FindByNameAsync(ApplicationRole.APPLICATION_ROLE_ADMIN);
                user.UserRoles.Add(new ApplicationUserRole
                {
                    RoleId = role.Id
                });
                var result = await _userManager.CreateAsync(user, "admin12!");

                if (!result.Succeeded)
                {
                    errors.AddRange(result.Errors.Select(e => e.Description));
                }
            }
            catch (Exception e)
            {
                errors.Add(e.Message);
            }

            return errors;
        }

        public async Task<List<string>> SetupWaiterAsync()
        {
            var errors = new List<string>();

            //Create role
            try
            {
                var role = new ApplicationRole
                {
                    Name = ApplicationRole.APPLICATION_ROLE_WAITER
                };

                var result = await _roleManager.CreateAsync(role);

                if (!result.Succeeded)
                {
                    errors.AddRange(result.Errors.Select(e => e.Description));
                }
            }
            catch (Exception e)
            {
                errors.Add(e.Message);
            }

            //Create role claim
            try
            {
                var role = await _roleManager.FindByNameAsync(ApplicationRole.APPLICATION_ROLE_WAITER);
                var result = await _roleManager.AddClaimAsync(role, new Claim(ClaimTypes.Name, ApplicationRoleClaim.CLAIM_VALUE_WAITER));

                if (!result.Succeeded)
                {
                    errors.AddRange(result.Errors.Select(e => e.Description));
                }
            }
            catch (Exception e)
            {
                errors.Add(e.Message);
            }

            //Create user
            try
            {
                var user = new ApplicationUser
                {
                    UserName = "waiter",
                    Email = "waiter@cappannahelper.it",
                    FirstName = "Waiter",
                    Surname = "Waiter"
                };
                var role = await _roleManager.FindByNameAsync(ApplicationRole.APPLICATION_ROLE_WAITER);
                user.UserRoles.Add(new ApplicationUserRole
                {
                    RoleId = role.Id
                });
                var result = await _userManager.CreateAsync(user, "waiter12!");

                if (!result.Succeeded)
                {
                    errors.AddRange(result.Errors.Select(e => e.Description));
                }
            }
            catch (Exception e)
            {
                errors.Add(e.Message);
            }

            return errors;
        }
    }
}