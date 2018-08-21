using CappannaHelper.Api.Identity.DataModel;
using CappannaHelper.Api.Persistence;
using CappannaHelper.Api.Persistence.Modelling;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
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

            try
            {
                using (var transaction = await _context.Database.BeginTransactionAsync())
                {
                    await SetupUsersAsync(errors);
                    await SetupMenuAsync(errors);
                    await SetupOperationTypesAsync(errors);

                    transaction.Commit();
                }
            }
            catch (Exception e)
            {
                errors.Add(e.Message);
            }

            return errors;
        }

        private async Task SetupUsersAsync(List<string> errors)
        {
            await SetupAdminAsync(errors);
            await SetupWaiterAsync(errors);
        }

        private async Task SetupAdminAsync(List<string> errors)
        {
            await SetupRoleAsync(ApplicationRole.APPLICATION_ROLE_ADMIN, errors);
            await SetupRoleClaimAsync(ApplicationRole.APPLICATION_ROLE_ADMIN, ClaimTypes.Name, ApplicationRoleClaim.CLAIM_VALUE_ADMIN, errors);
            await SetupUserAsync("admin", "admin@cappannahelper.it", "Admin", "Admin", "admin12!", errors);
            await SetupUserRoleAsync("admin", ApplicationRole.APPLICATION_ROLE_ADMIN, errors);
        }

        private async Task SetupWaiterAsync(List<string> errors)
        {
            await SetupRoleAsync(ApplicationRole.APPLICATION_ROLE_WAITER, errors);
            await SetupRoleClaimAsync(ApplicationRole.APPLICATION_ROLE_WAITER, ClaimTypes.Name, ApplicationRoleClaim.CLAIM_VALUE_WAITER, errors);
            await SetupUserAsync("waiter", "waiter@cappannahelper.it", "Waiter", "Waiter", "waiter12!", errors);
            await SetupUserRoleAsync("waiter", ApplicationRole.APPLICATION_ROLE_WAITER, errors);
        }

        private async Task SetupMenuAsync(List<string> errors)
        {
            await SetupDishesAsync(errors);
            await SetupDrinksAsync(errors);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception e)
            {
                errors.Add(e.Message);
            }
        }

        private async Task SetupDishesAsync(List<string> errors)
        {
            await SetupAppetizersAsync(errors);
            await SetupFirstDishesAsync(errors);
            await SetupSecondDishesAsync(errors);
            await SetupSideDishesAsync(errors);
            await SetupDessertDishesAsync(errors);
        }

        private async Task SetupAppetizersAsync(List<string> errors)
        {
            await SetupMenuDetailAsync(MenuDetail.APPETIZER, "Insalata di mare", 5.5M, errors);
            await SetupMenuDetailAsync(MenuDetail.APPETIZER, "Alici marinate", 5.5M, errors);
            await SetupMenuDetailAsync(MenuDetail.APPETIZER, "Degustazione di antipasti", 9.0M, errors);
        }

        private async Task SetupFirstDishesAsync(List<string> errors)
        {
            await SetupMenuDetailAsync(MenuDetail.FIRST_DISH, "Chitarrine dell'Adriatico", 8.0M, errors);
            await SetupMenuDetailAsync(MenuDetail.FIRST_DISH, "Gnocchi ai frutti di mare", 8.0M, errors);
            await SetupMenuDetailAsync(MenuDetail.FIRST_DISH, "Pennette alla vodka", 7.5M, errors);
            await SetupMenuDetailAsync(MenuDetail.FIRST_DISH, "Gnocchi alla papera", 7.0M, errors);
            await SetupMenuDetailAsync(MenuDetail.FIRST_DISH, "Polenta con sugo di papera", 6.0M, errors);
            await SetupMenuDetailAsync(MenuDetail.FIRST_DISH, "Polenta con sugo di pesce", 7.0M, errors);
        }

        private async Task SetupSecondDishesAsync(List<string> errors)
        {
            await SetupMenuDetailAsync(MenuDetail.SECOND_DISH, "Fritto calamari e gamberi", 10.0M, errors);
            await SetupMenuDetailAsync(MenuDetail.SECOND_DISH, "Seppie e piselli", 9.0M, errors);
            await SetupMenuDetailAsync(MenuDetail.SECOND_DISH, "Sardoncini scottadito", 6.0M, errors);
            await SetupMenuDetailAsync(MenuDetail.SECOND_DISH, "Stinco al forno", 6.0M, errors);
            await SetupMenuDetailAsync(MenuDetail.SECOND_DISH, "Piadina con prosciutto", 3.5M, errors);
            await SetupMenuDetailAsync(MenuDetail.SECOND_DISH, "Cresciola di polenta", 3.0M, errors);
            await SetupMenuDetailAsync(MenuDetail.SECOND_DISH, "Panino con salsiccia", 4.0M, errors);
            await SetupMenuDetailAsync(MenuDetail.SECOND_DISH, "Panino con hamburger", 4.5M, errors);
            await SetupMenuDetailAsync(MenuDetail.SECOND_DISH, "Panino con bistecca", 4.5M, errors);
        }

        private async Task SetupSideDishesAsync(List<string> errors)
        {
            await SetupMenuDetailAsync(MenuDetail.SIDE_DISH, "Olive all'ascolana", 3.5M, errors);
            await SetupMenuDetailAsync(MenuDetail.SIDE_DISH, "Cremini fritti", 3.5M, errors);
            await SetupMenuDetailAsync(MenuDetail.SIDE_DISH, "Patatine fritte", 3.0M, errors);
        }

        private async Task SetupDessertDishesAsync(List<string> errors)
        {
            await SetupMenuDetailAsync(MenuDetail.DESSERT_DISH, "Rose del deserto", 2.0M, errors);
            await SetupMenuDetailAsync(MenuDetail.DESSERT_DISH, "Salame Dolce", 2.0M, errors);
            await SetupMenuDetailAsync(MenuDetail.DESSERT_DISH, "Ciambelline all'anice", 2.0M, errors);
            await SetupMenuDetailAsync(MenuDetail.DESSERT_DISH, "Degustazione Dolci", 2.0M, errors);
        }

        private async Task SetupDrinksAsync(List<string> errors)
        {
            await SetupWhiteWinesAsync(errors);
            await SetupRedWinesAsync(errors);
            await SetupWaterAsync(errors);
            await SetupDrinkDetailsAsync(errors);
        }

        private async Task SetupWhiteWinesAsync(List<string> errors)
        {
            await SetupMenuDetailAsync(MenuDetail.WHITE_WINE, "Vino al bicchiere (Verdicchio)", 1.0M, errors);
            await SetupMenuDetailAsync(MenuDetail.WHITE_WINE, "Verdicchio doc 1 L", 5.0M, errors);
            await SetupMenuDetailAsync(MenuDetail.WHITE_WINE, "Anfora verdicchio doc", 6.0M, errors);
            await SetupMenuDetailAsync(MenuDetail.WHITE_WINE, "Bersò (frizzante)", 6.0M, errors);
            await SetupMenuDetailAsync(MenuDetail.WHITE_WINE, "Lyricus", 6.0M, errors);
            await SetupMenuDetailAsync(MenuDetail.WHITE_WINE, "Cuapro", 10.0M, errors);
            await SetupMenuDetailAsync(MenuDetail.WHITE_WINE, "Cuprese", 10.0M, errors);
            await SetupMenuDetailAsync(MenuDetail.WHITE_WINE, "Tufico", 12.0M, errors);
            await SetupMenuDetailAsync(MenuDetail.WHITE_WINE, "San Michele", 14.0M, errors);
            await SetupMenuDetailAsync(MenuDetail.WHITE_WINE, "Manciano", 9.0M, errors);
            await SetupMenuDetailAsync(MenuDetail.WHITE_WINE, "Il Priore", 13.0M, errors);
            await SetupMenuDetailAsync(MenuDetail.WHITE_WINE, "Salerna", 10.0M, errors);
            await SetupMenuDetailAsync(MenuDetail.WHITE_WINE, "Capovolto", 13.0M, errors);
            await SetupMenuDetailAsync(MenuDetail.WHITE_WINE, "Fonte Cherubini", 11.0M, errors);
            await SetupMenuDetailAsync(MenuDetail.WHITE_WINE, "Oinochoe", 10.0M, errors);
            await SetupMenuDetailAsync(MenuDetail.WHITE_WINE, "Brecciole", 10.0M, errors);
            await SetupMenuDetailAsync(MenuDetail.WHITE_WINE, "Spumante 'Cuvee Tradition'", 10.0M, errors);
        }

        private async Task SetupRedWinesAsync(List<string> errors)
        {
            await SetupMenuDetailAsync(MenuDetail.RED_WINE, "Vino al bicchiere (Lacrima)", 1.0M, errors);
            await SetupMenuDetailAsync(MenuDetail.RED_WINE, "Vino rosso doc 1 L", 5.0M, errors);
            await SetupMenuDetailAsync(MenuDetail.RED_WINE, "Lyricus (Rosso Piceno)", 1.0M, errors);
            await SetupMenuDetailAsync(MenuDetail.RED_WINE, "Tornamagno (Rosso IGT)", 1.0M, errors);
            await SetupMenuDetailAsync(MenuDetail.RED_WINE, "Superbo (Lacrima Morro d'Alba)", 1.0M, errors);
            await SetupMenuDetailAsync(MenuDetail.RED_WINE, "Ghirola (Rosso Piceno)", 1.0M, errors);
            await SetupMenuDetailAsync(MenuDetail.RED_WINE, "Nerium (Rosso Piceno)", 1.0M, errors);
            await SetupMenuDetailAsync(MenuDetail.RED_WINE, "Visciola (bicchiere)", 2.0M, errors);
            await SetupMenuDetailAsync(MenuDetail.RED_WINE, "Visciola (bottiglia 0,5L)", 15.0M, errors);
        }

        private async Task SetupWaterAsync(List<string> errors)
        {
            await SetupMenuDetailAsync(MenuDetail.WATER, "Acqua mineralizzata 1L (nat.)", 1.0M, errors);
            await SetupMenuDetailAsync(MenuDetail.WATER, "Acqua mineralizzata 1L (friz.)", 1.0M, errors);
            await SetupMenuDetailAsync(MenuDetail.WATER, "Acqua bottiglia 0,5L (nat.)", 1.0M, errors);
            await SetupMenuDetailAsync(MenuDetail.WATER, "Acqua bottiglia 0,5L (friz.)", 1.0M, errors);
        }

        private async Task SetupDrinkDetailsAsync(List<string> errors)
        {
            await SetupMenuDetailAsync(MenuDetail.DRINK, "Coca cola", 2.0M, errors);
            await SetupMenuDetailAsync(MenuDetail.DRINK, "Fanta", 2.0M, errors);
            await SetupMenuDetailAsync(MenuDetail.DRINK, "Sprite", 2.0M, errors);
            await SetupMenuDetailAsync(MenuDetail.DRINK, "Birra (bottiglia)", 2.5M, errors);
            await SetupMenuDetailAsync(MenuDetail.DRINK, "Caffe", 1.0M, errors);
        }

        private async Task SetupMenuDetailAsync(string group, string name, decimal price, List<string> errors)
        {
            try
            {
                if (!await _context.MenuDetails.AnyAsync(d => d.Name == name && d.Group == group))
                {
                    await _context.AddAsync(new MenuDetail
                    {
                        Group = group,
                        Name = name,
                        Price = price
                    });

                    await _context.SaveChangesAsync();
                }
            }
            catch (Exception e)
            {
                errors.Add(e.Message);
            }
        }

        private async Task SetupRoleAsync(string name, List<string> errors)
        {
            try
            {
                if (!await _roleManager.RoleExistsAsync(name))
                {
                    var result = await _roleManager.CreateAsync(new ApplicationRole
                    {
                        Name = name
                    });

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
        }

        private async Task SetupRoleClaimAsync(string roleName, string claimName, string claimValue, List<string> errors)
        {
            try
            {
                var role = await _roleManager.FindByNameAsync(roleName);
                var claim = await _roleManager.GetClaimsAsync(role);

                if (!claim.Any(c => c.Type == claimName))
                {
                    var result = await _roleManager.AddClaimAsync(role, new Claim(claimName, claimValue));

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
        }

        private async Task SetupUserAsync(string username, string email, string firstName, string lastName, string password, List<string> errors)
        {
            try
            {
                var user = await _userManager.FindByNameAsync(username);

                if (user == null)
                {
                    user = new ApplicationUser
                    {
                        UserName = username,
                        Email = email,
                        FirstName = firstName,
                        Surname = lastName
                    };

                    var result = await _userManager.CreateAsync(user, password);

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
        }

        private async Task SetupUserRoleAsync(string username, string roleName, List<string> errors)
        {
            try
            {
                var user = await _userManager.FindByNameAsync(username);
                var userIsInRole = await _userManager.IsInRoleAsync(user, roleName);

                if (!userIsInRole)
                {
                    var result = await _userManager.AddToRoleAsync(user, roleName);

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
        }

        private async Task SetupOperationTypesAsync(List<string> errors)
        {
            await SetupOperationTypeAsync(OperationTypes.Creation, "creation", errors);
            await SetupOperationTypeAsync(OperationTypes.Print, "print", errors);
            await SetupOperationTypeAsync(OperationTypes.Edit, "edit", errors);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception e)
            {
                errors.Add(e.Message);
            }
        }
        
        private async Task SetupOperationTypeAsync(OperationTypes type, string description, List<string> errors)
        {
            try
            {
                var id = (int)type;
                if (!await _context.OperationTypes.AnyAsync(d => d.Id == id))
                {
                    await _context.AddAsync(new OperationType
                    {
                        Id = id,
                        Description = description
                    });
                }
            }
            catch (Exception e)
            {
                errors.Add(e.Message);
            }
        }
    }
}
