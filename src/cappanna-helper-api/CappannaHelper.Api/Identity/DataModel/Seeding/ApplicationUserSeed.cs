using CappannaHelper.Api.Common.DataModel.Seeding;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;

namespace CappannaHelper.Api.Identity.DataModel.Seeding
{
    public class ApplicationUserSeed : EntitySeed<ApplicationUser>
    {
        public ApplicationUserSeed(ModelBuilder builder)
            : base(builder)
        { }

        protected override ICollection<ApplicationUser> GetEntities()
        {
            var hasher = new PasswordHasher<ApplicationUser>();

            var admin = new ApplicationUser
            {
                Id = 1,
                FirstName = "admin",
                Surname = "admin",
                Email = "admin@cappannahelper.it",
                NormalizedEmail = "ADMIN@CAPPANNAHELPER.IT",
                UserName = "admin",
                NormalizedUserName = "ADMIN",
                SecurityStamp = Guid.Empty.ToString(),
                EmailConfirmed = true,
                LockoutEnabled = false
            };
            admin.PasswordHash = hasher.HashPassword(admin, "admin");
            admin.UserRoles.Add(new ApplicationUserRole
            {
                UserId = 1,
                RoleId = 1
            });

            var waiter = new ApplicationUser
            {
                Id = 2,
                FirstName = "waiter",
                Surname = "waiter",
                Email = "waiter@cappannahelper.it",
                NormalizedEmail = "WAITER@CAPPANNAHELPER.IT",
                UserName = "waiter",
                NormalizedUserName = "WAITER",
                SecurityStamp = Guid.Empty.ToString(),
                EmailConfirmed = true,
                LockoutEnabled = false
            };
            waiter.PasswordHash = hasher.HashPassword(waiter, "waiter");
            waiter.UserRoles.Add(new ApplicationUserRole
            {
                UserId = 2,
                RoleId = 2
            });

            return new List<ApplicationUser>
            {
                admin,
                waiter
            };
        }
    }
}
