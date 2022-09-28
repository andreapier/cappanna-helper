using CappannaHelper.Api.Identity.DataModel;
using CappannaHelper.Api.Persistence;
using CappannaHelper.Api.Persistence.Modelling;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
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

            await MigrateAsync(errors);
            await ActivateWalModeAsync(errors);

            try
            {
                using var transaction = await _context.Database.BeginTransactionAsync();
                await SetupStandsAsync(errors);
                await SetupRolesAsync(errors);
                await SetupUsersAsync(errors);
                await SetupMenuAsync(errors);
                await SetupOperationTypesAsync(errors);
                await SetupSettingsAsync(errors);

                transaction.Commit();
            }
            catch (Exception e)
            {
                errors.Add(e.Message);
            }

            return errors;
        }

        private async Task MigrateAsync(List<string> errors)
        {
            try
            {
                await _context.Database.MigrateAsync();
            }
            catch (Exception e)
            {
                errors.Add(e.Message);
            }
        }

        private async Task ActivateWalModeAsync(List<string> errors)
        {
            try
            {
                var connection = _context.Database.GetDbConnection();

                if (connection.State != ConnectionState.Open)
                {
                    await connection.OpenAsync();
                }

                using var command = connection.CreateCommand();
                command.CommandText = "PRAGMA journal_mode=WAL;";
                await command.ExecuteNonQueryAsync();
            }
            catch (Exception e)
            {
                errors.Add(e.Message);
            }
        }

        private async Task SetupRolesAsync(List<string> errors)
        {
            await SetupAdminRoleAsync(errors);
            await SetupWaiterRoleAsync(errors);
            await SetupDomeRoleAsync(errors);
            await SetupCashierRoleAsync(errors);
        }

        private async Task SetupUsersAsync(List<string> errors)
        {
            await SetupAdminAsync(errors);
            await SetupBaseballWaiterAsync(errors);
            await SetupZenaWaiterAsync(errors);
            await SetupDomeAsync(errors);
            await SetupBaseballCashierAsync(errors);
            await SetupZenaCashierAsync(errors);
        }

        private async Task SetupAdminRoleAsync(List<string> errors)
        {
            await SetupRoleAsync(ApplicationRole.APPLICATION_ROLE_ADMIN, errors);
            await SetupRoleClaimAsync(ApplicationRole.APPLICATION_ROLE_ADMIN, ClaimTypes.Name, ApplicationRoleClaim.CLAIM_VALUE_ADMIN, errors);
        }

        private async Task SetupWaiterRoleAsync(List<string> errors)
        {
            await SetupRoleAsync(ApplicationRole.APPLICATION_ROLE_WAITER, errors);
            await SetupRoleClaimAsync(ApplicationRole.APPLICATION_ROLE_WAITER, ClaimTypes.Name, ApplicationRoleClaim.CLAIM_VALUE_WAITER, errors);
        }

        private async Task SetupDomeRoleAsync(List<string> errors)
        {
            await SetupRoleAsync(ApplicationRole.APPLICATION_ROLE_DOME, errors);
            await SetupRoleClaimAsync(ApplicationRole.APPLICATION_ROLE_DOME, ClaimTypes.Name, ApplicationRoleClaim.CLAIM_VALUE_DOME, errors);
        }

        private async Task SetupCashierRoleAsync(List<string> errors)
        {
            await SetupRoleAsync(ApplicationRole.APPLICATION_ROLE_CASHIER, errors);
            await SetupRoleClaimAsync(ApplicationRole.APPLICATION_ROLE_CASHIER, ClaimTypes.Name, ApplicationRoleClaim.CLAIM_VALUE_CASHIER, errors);
        }

        private async Task SetupAdminAsync(List<string> errors)
        {
            await SetupUserAsync("admin", "admin@cappannahelper.it", "Admin", "Admin", "admin12!", 1, errors);
            await SetupUserRoleAsync("admin", ApplicationRole.APPLICATION_ROLE_ADMIN, errors);
        }

        private async Task SetupDomeAsync(List<string> errors)
        {
            await SetupUserAsync("dome", "dome@cappannahelper.it", "Dome", "Dome", "dome123!", 1, errors);
            await SetupUserRoleAsync("dome", ApplicationRole.APPLICATION_ROLE_DOME, errors);
        }

        private async Task SetupBaseballWaiterAsync(List<string> errors)
        {
            await SetupUserAsync("waiter", "waiter@cappannahelper.it", "Waiter", "Waiter", "waiter12!", 1, errors);
            await SetupUserRoleAsync("waiter", ApplicationRole.APPLICATION_ROLE_WAITER, errors);
        }

        private async Task SetupZenaWaiterAsync(List<string> errors)
        {
            await SetupUserAsync("waiterzena", "waiterzena@cappannahelper.it", "Waiter", "Zena", "waiterzena12!", 2, errors);
            await SetupUserRoleAsync("waiterzena", ApplicationRole.APPLICATION_ROLE_WAITER, errors);
        }

        private async Task SetupBaseballCashierAsync(List<string> errors)
        {
            await SetupUserAsync("cashier", "cashier@cappannahelper.it", "Cashier", "Cashier", "cashier12!", 1, errors);
            await SetupUserRoleAsync("cashier", ApplicationRole.APPLICATION_ROLE_CASHIER, errors);
        }

        private async Task SetupZenaCashierAsync(List<string> errors)
        {
            await SetupUserAsync("cashierzena", "cashierzena@cappannahelper.it", "Cashier", "Cashier", "cashierzena12!", 2, errors);
            await SetupUserRoleAsync("cashierzena", ApplicationRole.APPLICATION_ROLE_CASHIER, errors);
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
            await SetupMenuDetailAsync(MenuDetail.APPETIZER, "Insalata di mare", 7.5M, errors);
            await SetupMenuDetailAsync(MenuDetail.APPETIZER, "Totano patate olive", 7.5M, errors);
            await SetupMenuDetailAsync(MenuDetail.APPETIZER, "Bruschetta baccalà mantec.", 2.5M, errors);
            await SetupMenuDetailAsync(MenuDetail.APPETIZER, "Degustazione di antipasti", 10.0M, errors);
        }

        private async Task SetupFirstDishesAsync(List<string> errors)
        {
            await SetupMenuDetailAsync(MenuDetail.FIRST_DISH, "Chitarrine dell'Adriatico", 9.0M, errors);
            await SetupMenuDetailAsync(MenuDetail.FIRST_DISH, "Gnocchi ai frutti di mare", 9.0M, errors);
            await SetupMenuDetailAsync(MenuDetail.FIRST_DISH, "Pennette alla vodka", 8.0M, errors);
            await SetupMenuDetailAsync(MenuDetail.FIRST_DISH, "Gnocchi alla papera", 8.5M, errors);
            await SetupMenuDetailAsync(MenuDetail.FIRST_DISH, "Polenta con sugo di papera", 6.5M, errors);
            await SetupMenuDetailAsync(MenuDetail.FIRST_DISH, "Polenta con sugo di pesce", 7.5M, errors);
        }

        private async Task SetupSecondDishesAsync(List<string> errors)
        {
            await SetupMenuDetailAsync(MenuDetail.SECOND_DISH, "Fritto calamari e gamberi", 12.0M, errors);
            await SetupMenuDetailAsync(MenuDetail.SECOND_DISH, "Coda di rospo e finocchio", 9.5M, errors);
			await SetupMenuDetailAsync(MenuDetail.SECOND_DISH, "Seppie con piselli", 9.0M, errors);
            await SetupMenuDetailAsync(MenuDetail.SECOND_DISH, "Costarelle fagioli salsiccia", 8.5M, errors);
            await SetupMenuDetailAsync(MenuDetail.SECOND_DISH, "Piadina prosciutto", 4.5M, errors);
            await SetupMenuDetailAsync(MenuDetail.SECOND_DISH, "Piadina prosciutto formaggio", 5.5M, errors);
            await SetupMenuDetailAsync(MenuDetail.SECOND_DISH, "Cresciola di polenta", 3.5M, errors);
            await SetupMenuDetailAsync(MenuDetail.SECOND_DISH, "Bruschetta salsa pesce", 2.0M, errors);
            await SetupMenuDetailAsync(MenuDetail.SECOND_DISH, "Panino con salsiccia", 5.0M, errors);
            await SetupMenuDetailAsync(MenuDetail.SECOND_DISH, "Panino con hamburger", 5.0M, errors);
            await SetupMenuDetailAsync(MenuDetail.SECOND_DISH, "Panino con bistecca", 5.0M, errors);
        }

        private async Task SetupSideDishesAsync(List<string> errors)
        {
            await SetupMenuDetailAsync(MenuDetail.SIDE_DISH, "Olive all'ascolana", 4.5M, errors);
            await SetupMenuDetailAsync(MenuDetail.SIDE_DISH, "Cremini fritti", 4.0M, errors);
            await SetupMenuDetailAsync(MenuDetail.SIDE_DISH, "Patatine fritte", 4.0M, errors);
        }

        private async Task SetupDessertDishesAsync(List<string> errors)
        {
            await SetupMenuDetailAsync(MenuDetail.DESSERT_DISH, "Rose del deserto", 3.0M, errors);
            await SetupMenuDetailAsync(MenuDetail.DESSERT_DISH, "Salame al cioccolato", 3.0M, errors);
            await SetupMenuDetailAsync(MenuDetail.DESSERT_DISH, "Biscotti al vino", 3.0M, errors);
            await SetupMenuDetailAsync(MenuDetail.DESSERT_DISH, "Degustazione Dolci", 6.0M, errors);
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
            await SetupMenuDetailAsync(MenuDetail.WHITE_WINE, "Vino al bicchiere (Verdicchio)", 1.5M, errors);
            await SetupMenuDetailAsync(MenuDetail.WHITE_WINE, "Verdicchio doc 1 L", 6.0M, errors);
            await SetupMenuDetailAsync(MenuDetail.WHITE_WINE, "Verdicchio doc 0,5 L", 3M, errors);
            await SetupMenuDetailAsync(MenuDetail.WHITE_WINE, "Bersò", 7.0M, errors);
            await SetupMenuDetailAsync(MenuDetail.WHITE_WINE, "Lyricus", 7.0M, errors);
            await SetupMenuDetailAsync(MenuDetail.WHITE_WINE, "Cuapro (Bio)", 10.0M, errors);
            await SetupMenuDetailAsync(MenuDetail.WHITE_WINE, "Cuprese", 12.0M, errors);
            await SetupMenuDetailAsync(MenuDetail.WHITE_WINE, "Tufico", 14.0M, errors);
            await SetupMenuDetailAsync(MenuDetail.WHITE_WINE, "San Michele", 15.0M, errors);
            await SetupMenuDetailAsync(MenuDetail.WHITE_WINE, "Vale", 12.0M, errors);
            await SetupMenuDetailAsync(MenuDetail.WHITE_WINE, "Il Priore", 15.0M, errors);
            await SetupMenuDetailAsync(MenuDetail.WHITE_WINE, "Salerna", 12.0M, errors);
            await SetupMenuDetailAsync(MenuDetail.WHITE_WINE, "Capovolto", 15.0M, errors);
            await SetupMenuDetailAsync(MenuDetail.WHITE_WINE, "Saltatempo", 13.0M, errors);
            await SetupMenuDetailAsync(MenuDetail.WHITE_WINE, "Raggi d'uva (Bio)", 8.0M, errors);
			await SetupMenuDetailAsync(MenuDetail.WHITE_WINE, "Oinochoe (Bio)", 14.0M, errors);
            await SetupMenuDetailAsync(MenuDetail.WHITE_WINE, "Valdè", 11.0M, errors);
            await SetupMenuDetailAsync(MenuDetail.WHITE_WINE, "Brecciole", 12.0M, errors);
            await SetupMenuDetailAsync(MenuDetail.WHITE_WINE, "Spumante 'Cuvee Tradition'", 11.0M, errors);
        }

        private async Task SetupRedWinesAsync(List<string> errors)
        {
            await SetupMenuDetailAsync(MenuDetail.RED_WINE, "Vino al bicchiere (Lacrima)", 1.5M, errors);
            await SetupMenuDetailAsync(MenuDetail.RED_WINE, "Vino al bicchiere (Visciola)", 2.0M, errors);
            await SetupMenuDetailAsync(MenuDetail.RED_WINE, "Vino rosso doc 1 L", 6.0M, errors);
            await SetupMenuDetailAsync(MenuDetail.RED_WINE, "Vino rosso doc 0,5 L", 3.0M, errors);
            await SetupMenuDetailAsync(MenuDetail.RED_WINE, "Lyricus (Rosso Piceno)", 7.0M, errors);
            await SetupMenuDetailAsync(MenuDetail.RED_WINE, "Tornamagno (IGT)", 14.0M, errors);
            await SetupMenuDetailAsync(MenuDetail.RED_WINE, "Bastian Contrario", 13.0M, errors);
            await SetupMenuDetailAsync(MenuDetail.RED_WINE, "Superbo (Lacrima)", 14.0M, errors);
            await SetupMenuDetailAsync(MenuDetail.RED_WINE, "Visciola (bottiglia 0,5L)", 13.0M, errors);
        }

        private async Task SetupWaterAsync(List<string> errors)
        {
            await SetupMenuDetailAsync(MenuDetail.WATER, "Acqua naturale 1L", 1.5M, errors);
            await SetupMenuDetailAsync(MenuDetail.WATER, "Acqua frizzante 1L", 1.5M, errors);
            await SetupMenuDetailAsync(MenuDetail.WATER, "Acqua bottiglia 0,5L (nat.)", 1.0M, errors);
            await SetupMenuDetailAsync(MenuDetail.WATER, "Acqua bottiglia 0,5L (friz.)", 1.0M, errors);
        }

        private async Task SetupDrinkDetailsAsync(List<string> errors)
        {
            await SetupMenuDetailAsync(MenuDetail.DRINK, "Coca cola", 2.0M, errors);
            await SetupMenuDetailAsync(MenuDetail.DRINK, "Fanta", 2.0M, errors);
            await SetupMenuDetailAsync(MenuDetail.DRINK, "Sprite", 2.0M, errors);
            await SetupMenuDetailAsync(MenuDetail.DRINK, "Birra (bottiglia)", 3.0M, errors);
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

        private async Task SetupUserAsync(string username, string email, string firstName, string lastName, string password, int standId, List<string> errors)
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
                        Surname = lastName,
                        Settings = new UserSetting
                        {
                            StandId = standId
                        }
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
            await SetupOperationTypeAsync(OperationTypes.Close, "close", errors);

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

        private async Task SetupSettingsAsync(List<string> errors)
        {
            await SetupSettingAsync(Setting.AUTO_PRINT, false, errors);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception e)
            {
                errors.Add(e.Message);
            }
        }

        private async Task SetupSettingAsync(string name, object value, List<string> errors)
        {
            try
            {
                if (!await _context.Settings.AnyAsync(d => d.Name == name))
                {
                    await _context.AddAsync(new Setting
                    {
                        Name = name,
                        Type = value.GetType().Name,
                        Value = value.ToString()
                    });

                    await _context.SaveChangesAsync();
                }
            }
            catch (Exception e)
            {
                errors.Add(e.Message);
            }
        }

        private async Task SetupStandsAsync(List<string> errors)
        {
            await SetupStandAsync("Cupra baseball", Stand.KEY_CUPRA, errors);
            await SetupStandAsync("Zena", Stand.KEY_ZENA, errors);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception e)
            {
                errors.Add(e.Message);
            }
        }

        private async Task SetupStandAsync(string description, string printLabel, List<string> errors)
        {
            try
            {
                if (!await _context.Stands.AnyAsync(d => d.Description == description))
                {
                    await _context.AddAsync(new Stand
                    {
                        Description = description,
                        PrintLabel = printLabel
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
