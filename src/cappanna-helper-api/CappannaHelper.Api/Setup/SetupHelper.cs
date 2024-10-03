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

namespace CappannaHelper.Api.Setup;

public class SetupHelper : ISetupHelper
{
    private readonly RoleManager<ApplicationRole> _roleManager;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly ApplicationDbContext _context;

    public SetupHelper(RoleManager<ApplicationRole> roleManager, UserManager<ApplicationUser> userManager, ApplicationDbContext context)
    {
        _userManager = userManager;
        _roleManager = roleManager;
        _context = context;
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
            await SetupSettingsAsync(errors);
            await SetupShiftsAsync(errors);

            await transaction.CommitAsync();
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
        await SetupMenuDetailAsync(MenuDetail.APPETIZER, "Impepata cozze", 8.0M, errors);
        await SetupMenuDetailAsync(MenuDetail.APPETIZER, "Insalata mare", 8.0M, errors);
        await SetupMenuDetailAsync(MenuDetail.APPETIZER, "Instalata polipo", 8.0M, errors);
        await SetupMenuDetailAsync(MenuDetail.APPETIZER, "Bruschetta baccala", 3.0M, errors);
        await SetupMenuDetailAsync(MenuDetail.APPETIZER, "Degustazione", 10.0M, errors);
    }

    private async Task SetupFirstDishesAsync(List<string> errors)
    {
        await SetupMenuDetailAsync(MenuDetail.FIRST_DISH, "Chitarrine Adriatico", 10.0M, errors);
        await SetupMenuDetailAsync(MenuDetail.FIRST_DISH, "Gnocchi frutti mare", 10.0M, errors);
        await SetupMenuDetailAsync(MenuDetail.FIRST_DISH, "Pennette vodka", 9.0M, errors);
        await SetupMenuDetailAsync(MenuDetail.FIRST_DISH, "Gnocchi papera", 9.0M, errors);
        await SetupMenuDetailAsync(MenuDetail.FIRST_DISH, "Polenta papera", 9.0M, errors);
        await SetupMenuDetailAsync(MenuDetail.FIRST_DISH, "Polenta pesce", 10.0M, errors);
    }

    private async Task SetupSecondDishesAsync(List<string> errors)
    {
        await SetupMenuDetailAsync(MenuDetail.SECOND_DISH, "Fritto calamari gamberi", 12.0M, errors);
        await SetupMenuDetailAsync(MenuDetail.SECOND_DISH, "Coda di rospo", 10.0M, errors);
		await SetupMenuDetailAsync(MenuDetail.SECOND_DISH, "Baccala fritto", 12.0M, errors);
        await SetupMenuDetailAsync(MenuDetail.SECOND_DISH, "Piadina prosciutto", 4.5M, errors);
        await SetupMenuDetailAsync(MenuDetail.SECOND_DISH, "Piadina prosciutto formaggio", 5.5M, errors);
        await SetupMenuDetailAsync(MenuDetail.SECOND_DISH, "Cresciola polenta", 5.0M, errors);
        await SetupMenuDetailAsync(MenuDetail.SECOND_DISH, "Panino salsiccia", 5.5M, errors);
        await SetupMenuDetailAsync(MenuDetail.SECOND_DISH, "Panino bistecca", 5.5M, errors);
        await SetupMenuDetailAsync(MenuDetail.SECOND_DISH, "Hamburger", 6.0M, errors);
    }

    private async Task SetupSideDishesAsync(List<string> errors)
    {
        await SetupMenuDetailAsync(MenuDetail.SIDE_DISH, "Olive ascolana", 5.0M, errors);
        await SetupMenuDetailAsync(MenuDetail.SIDE_DISH, "Cremini fritti", 5.0M, errors);
        await SetupMenuDetailAsync(MenuDetail.SIDE_DISH, "Patatine fritte", 4.0M, errors);
        await SetupMenuDetailAsync(MenuDetail.SIDE_DISH, "Bruschetta pesce", 3.0M, errors);
        await SetupMenuDetailAsync(MenuDetail.SIDE_DISH, "Bruschetta verdure", 2.0M, errors);
    }

    private async Task SetupDessertDishesAsync(List<string> errors)
    {
        await SetupMenuDetailAsync(MenuDetail.DESSERT_DISH, "Rose del deserto", 4.0M, errors);
        await SetupMenuDetailAsync(MenuDetail.DESSERT_DISH, "Salame al cioccolato", 4.0M, errors);
        await SetupMenuDetailAsync(MenuDetail.DESSERT_DISH, "Ciambelle anice", 4.0M, errors);
        await SetupMenuDetailAsync(MenuDetail.DESSERT_DISH, "Degustazione Dolci", 6.0M, errors);
        await SetupMenuDetailAsync(MenuDetail.DESSERT_DISH, "Sorbetto limone", 3.0M, errors);
    }

    private async Task SetupDrinksAsync(List<string> errors)
    {
        await SetupWhiteWinesAsync(errors);
        await SetupWhiteWineGlassesAsync(errors);
        await SetupRedWinesAsync(errors);
        await SetupRedWineGlassesAsync(errors);
        await SetupWaterAsync(errors);
        await SetupDrinkDetailsAsync(errors);
    }

    private async Task SetupWhiteWinesAsync(List<string> errors)
    {
        await SetupMenuDetailAsync(MenuDetail.WHITE_WINE, "Verdicchio 1 L", 6.0M, errors);
        await SetupMenuDetailAsync(MenuDetail.WHITE_WINE, "Verdicchio 0,5 L", 3M, errors);
        await SetupMenuDetailAsync(MenuDetail.WHITE_WINE, "Vino Frizz", 8.0M, errors);
        await SetupMenuDetailAsync(MenuDetail.WHITE_WINE, "Perla", 12.0M, errors);
        await SetupMenuDetailAsync(MenuDetail.WHITE_WINE, "Cuprese", 15.0M, errors);
        await SetupMenuDetailAsync(MenuDetail.WHITE_WINE, "San Michele", 17.0M, errors);
        await SetupMenuDetailAsync(MenuDetail.WHITE_WINE, "Il Priore", 16.0M, errors);
        await SetupMenuDetailAsync(MenuDetail.WHITE_WINE, "Salerna", 12.0M, errors);
        await SetupMenuDetailAsync(MenuDetail.WHITE_WINE, "Capovolto", 16.0M, errors);
        await SetupMenuDetailAsync(MenuDetail.WHITE_WINE, "Valde", 14.0M, errors);
        await SetupMenuDetailAsync(MenuDetail.WHITE_WINE, "Raggi uva", 10.0M, errors);
        await SetupMenuDetailAsync(MenuDetail.WHITE_WINE, "Oinochoe", 15.0M, errors);
        await SetupMenuDetailAsync(MenuDetail.WHITE_WINE, "Brecciole", 12.0M, errors);
        await SetupMenuDetailAsync(MenuDetail.WHITE_WINE, "Cuvee", 14.0M, errors);
    }

    private async Task SetupWhiteWineGlassesAsync(List<string> errors)
    {
        await SetupMenuDetailAsync(MenuDetail.WHITE_WINE_GLASS, "Verdicchio", 1.5M, errors);
        await SetupMenuDetailAsync(MenuDetail.WHITE_WINE_GLASS, "Vino Frizz", 2.5M, errors);
        await SetupMenuDetailAsync(MenuDetail.WHITE_WINE_GLASS, "Perla", 3.0M, errors);
        await SetupMenuDetailAsync(MenuDetail.WHITE_WINE_GLASS, "Cuprese", 3.5M, errors);
        await SetupMenuDetailAsync(MenuDetail.WHITE_WINE_GLASS, "San Michele", 3.5M, errors);
        await SetupMenuDetailAsync(MenuDetail.WHITE_WINE_GLASS, "Il Priore", 3.5M, errors);
        await SetupMenuDetailAsync(MenuDetail.WHITE_WINE_GLASS, "Salerna", 3.0M, errors);
        await SetupMenuDetailAsync(MenuDetail.WHITE_WINE_GLASS, "Capovolto", 3.5M, errors);
        await SetupMenuDetailAsync(MenuDetail.WHITE_WINE_GLASS, "Valde", 3.5M, errors);
        await SetupMenuDetailAsync(MenuDetail.WHITE_WINE_GLASS, "Raggi uva", 3.0M, errors);
        await SetupMenuDetailAsync(MenuDetail.WHITE_WINE_GLASS, "Oinochoe", 3.5M, errors);
        await SetupMenuDetailAsync(MenuDetail.WHITE_WINE_GLASS, "Brecciole", 3.0M, errors);
    }

    private async Task SetupRedWinesAsync(List<string> errors)
    {
        await SetupMenuDetailAsync(MenuDetail.RED_WINE, "Vino rosso 1 L", 6.0M, errors);
        await SetupMenuDetailAsync(MenuDetail.RED_WINE, "Vino rosso 0,5 L", 3.0M, errors);
        await SetupMenuDetailAsync(MenuDetail.RED_WINE, "Bastian Contrario", 16.0M, errors);
        await SetupMenuDetailAsync(MenuDetail.RED_WINE, "Superbo (Lacrima)", 16.0M, errors);
        await SetupMenuDetailAsync(MenuDetail.RED_WINE, "Visciola  0,5 L", 13.0M, errors);
        
    }

    private async Task SetupRedWineGlassesAsync(List<string> errors)
    {
        await SetupMenuDetailAsync(MenuDetail.RED_WINE_GLASS, "Vino rosso", 1.5M, errors);
        await SetupMenuDetailAsync(MenuDetail.RED_WINE_GLASS, "Bastian Contrario", 3.5M, errors);
        await SetupMenuDetailAsync(MenuDetail.RED_WINE_GLASS, "Superbo (Lacrima)", 3.5M, errors);
        await SetupMenuDetailAsync(MenuDetail.RED_WINE_GLASS, "Visciola", 2.0M, errors);
    }

    private async Task SetupWaterAsync(List<string> errors)
    {
        await SetupMenuDetailAsync(MenuDetail.WATER, "Acqua naturale 1L", 2.0M, errors);
        await SetupMenuDetailAsync(MenuDetail.WATER, "Acqua frizzante 1L", 2.0M, errors);
        await SetupMenuDetailAsync(MenuDetail.WATER, "Acqua naturale 0,5L", 1.0M, errors);
        await SetupMenuDetailAsync(MenuDetail.WATER, "Acqua frizzante 0,5L", 1.0M, errors);
    }

    private async Task SetupDrinkDetailsAsync(List<string> errors)
    {
        await SetupMenuDetailAsync(MenuDetail.DRINK, "Coca cola", 3.0M, errors);
        await SetupMenuDetailAsync(MenuDetail.DRINK, "Fanta", 3.0M, errors);
        await SetupMenuDetailAsync(MenuDetail.DRINK, "Birra", 3.0M, errors);
        await SetupMenuDetailAsync(MenuDetail.DRINK, "Caffe", 1.2M, errors);
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

    private async Task SetupShiftsAsync(List<string> errors)
    {
        var now = DateTime.Now;
        var year = now.Year;
        var firstOctober = new DateTime(year, 10, 01, 0, 0, 0, DateTimeKind.Local);
        var firstOctoberSunday = firstOctober;

        while (firstOctoberSunday.DayOfWeek != DayOfWeek.Sunday)
        {
            firstOctoberSunday = firstOctoberSunday.AddDays(1);
        }

        var wednesday = firstOctoberSunday.AddDays(-4);
        var thursday = firstOctoberSunday.AddDays(-3);
        var friday = firstOctoberSunday.AddDays(-2);
        var saturday = firstOctoberSunday.AddDays(-1);

        var lunchStartTime = TimeSpan.FromHours(10);
        var lunchEndTime = TimeSpan.FromHours(17);
        var dinnerStartTime = lunchEndTime;
        var dinnerEndTime = TimeSpan.FromHours(02);

        await SetupShiftsAsyncSetupShiftsAsync(wednesday.Add(dinnerStartTime), wednesday.Add(dinnerEndTime), "Mercoledì Cena", errors);
        await SetupShiftsAsyncSetupShiftsAsync(thursday.Add(dinnerStartTime), thursday.Add(dinnerEndTime), "Giovedì Cena", errors);
        await SetupShiftsAsyncSetupShiftsAsync(friday.Add(lunchStartTime), friday.Add(lunchEndTime), "Venerdì Cena", errors);
        await SetupShiftsAsyncSetupShiftsAsync(friday.Add(dinnerStartTime), friday.Add(dinnerEndTime), "Venerdì Cena", errors);
        await SetupShiftsAsyncSetupShiftsAsync(saturday.Add(lunchStartTime), saturday.Add(lunchEndTime), "Sabato Cena", errors);
        await SetupShiftsAsyncSetupShiftsAsync(saturday.Add(dinnerStartTime), saturday.Add(dinnerEndTime), "Sabato Cena", errors);
        await SetupShiftsAsyncSetupShiftsAsync(firstOctoberSunday.Add(lunchStartTime), firstOctoberSunday.Add(lunchEndTime), "Domenica Cena", errors);
        await SetupShiftsAsyncSetupShiftsAsync(firstOctoberSunday.Add(dinnerStartTime), firstOctoberSunday.Add(dinnerEndTime), "Domenica Cena", errors);

        var currentShift = await _context.Shifts.AnyAsync(x => x.OpenTimestamp <= now && x.CloseTimestamp >= now);
        if (!currentShift)
        {
            await _context.AddAsync(new Shift
            {
                OpenTimestamp = now.AddHours(-1),
                CloseTimestamp = now.AddHours(4),
                Description = "Turno di test/sviluppo",
            });
        }

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (Exception e)
        {
            errors.Add(e.Message);
        }
    }

    private async Task SetupShiftsAsyncSetupShiftsAsync(DateTime start, DateTime end, string description, List<string> errors)
    {
        try
        {
            if (!await _context.Shifts.AnyAsync(x => x.OpenTimestamp == start && x.CloseTimestamp == end))
            {
                await _context.AddAsync(new Shift
                {
                    OpenTimestamp = start,
                    CloseTimestamp = end,
                    Description = description,
                });

                await _context.SaveChangesAsync();
            }
        }
        catch (Exception e)
        {
            errors.Add(e.Message);
        }
    }
}
