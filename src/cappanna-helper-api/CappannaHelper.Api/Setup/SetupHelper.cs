using CappannaHelper.Api.Identity.DataModel;
using CappannaHelper.Api.Persistence;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace CappannaHelper.Api.Setup
{
    public class SetupHelper : ISetupHelper
    {
        private readonly RoleManager<ApplicationRole> _roleManager;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ApplicationDbContext _context;

        public SetupHelper(RoleManager<ApplicationRole> roleManager, UserManager<ApplicationUser> userManager, ApplicationDbContext context)
        {
            _userManager = userManager ?? throw new ArgumentNullException(nameof(userManager));
            _roleManager = roleManager ?? throw new ArgumentNullException(nameof(roleManager));
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public async Task<IList<string>> SetupAsync()
        {
            var errors = new List<string>();

            errors.AddRange(await SetupAdminAsync());
            errors.AddRange(await SetupWaiterAsync());

            return errors;
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

                if (!await _roleManager.RoleExistsAsync(role.Name))
                {
                    var result = await _roleManager.CreateAsync(role);

                    if (!result.Succeeded)
                    {
                        errors.AddRange(result.Errors.Select(e => e.Description));
                    }
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
                var claim = await _roleManager.GetClaimsAsync(role);

                if (!claim.Any(c => c.Type == ClaimTypes.Name))
                {
                    var result = await _roleManager.AddClaimAsync(role, new Claim(ClaimTypes.Name, ApplicationRoleClaim.CLAIM_VALUE_ADMIN));

                    if (!result.Succeeded)
                    {
                        errors.AddRange(result.Errors.Select(e => e.Description));
                    }
                }
            }
            catch (Exception e)
            {
                errors.Add(e.Message);
            }

            //Create user
            try
            {
                var user = await _userManager.FindByNameAsync("admin");

                if (user == null)
                {
                    user = new ApplicationUser
                    {
                        UserName = "admin",
                        Email = "admin@cappannahelper.it",
                        FirstName = "Admin",
                        Surname = "Admin"
                    };

                    var result = await _userManager.CreateAsync(user, "admin12!");

                    if (!result.Succeeded)
                    {
                        errors.AddRange(result.Errors.Select(e => e.Description));
                    }
                }
            }
            catch (Exception e)
            {
                errors.Add(e.Message);
            }

            //Create user role
            try
            {
                var user = await _userManager.FindByNameAsync("admin");
                var userIsInRole = await _userManager.IsInRoleAsync(user, ApplicationRole.APPLICATION_ROLE_ADMIN);

                if (!userIsInRole)
                {
                    var result = await _userManager.AddToRoleAsync(user, ApplicationRole.APPLICATION_ROLE_ADMIN);

                    if (!result.Succeeded)
                    {
                        errors.AddRange(result.Errors.Select(e => e.Description));
                    }
                }
            }
            catch (Exception)
            {

                throw;
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

                if (!await _roleManager.RoleExistsAsync(role.Name))
                {

                    var result = await _roleManager.CreateAsync(role);

                    if (!result.Succeeded)
                    {
                        errors.AddRange(result.Errors.Select(e => e.Description));
                    }
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
                var claim = await _roleManager.GetClaimsAsync(role);

                if (!claim.Any(c => c.Type == ClaimTypes.Name))
                {
                    var result = await _roleManager.AddClaimAsync(role, new Claim(ClaimTypes.Name, ApplicationRoleClaim.CLAIM_VALUE_WAITER));

                    if (!result.Succeeded)
                    {
                        errors.AddRange(result.Errors.Select(e => e.Description));
                    }
                }
            }
            catch (Exception e)
            {
                errors.Add(e.Message);
            }

            //Create user
            try
            {
                var user = await _userManager.FindByNameAsync("waiter");

                if (user == null)
                {
                    user = new ApplicationUser
                    {
                        UserName = "waiter",
                        Email = "waiter@cappannahelper.it",
                        FirstName = "Waiter",
                        Surname = "Waiter"
                    };

                    var result = await _userManager.CreateAsync(user, "waiter12!");

                    if (!result.Succeeded)
                    {
                        errors.AddRange(result.Errors.Select(e => e.Description));
                    }
                }
            }
            catch (Exception e)
            {
                errors.Add(e.Message);
            }

            //Create user role
            try
            {
                var user = await _userManager.FindByNameAsync("waiter");
                var userIsInRole = await _userManager.IsInRoleAsync(user, ApplicationRole.APPLICATION_ROLE_WAITER);

                if (!userIsInRole)
                {
                    var result = await _userManager.AddToRoleAsync(user, ApplicationRole.APPLICATION_ROLE_WAITER);

                    if (!result.Succeeded)
                    {
                        errors.AddRange(result.Errors.Select(e => e.Description));
                    }
                }
            }
            catch (Exception)
            {

                throw;
            }

            return errors;
        }
    }
}
