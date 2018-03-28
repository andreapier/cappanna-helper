using CappannaHelper.Api.Common.DataModel.Seeding;
using CappannaHelper.Api.Identity.DataModel.Seeding;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace CappannaHelper.Api.Persistence.Seeding
{
    public static class SeedingModelBuilderExtensions
    {
        public static ModelBuilder Seed(this ModelBuilder builder)
        {
            var seeds = new List<IEntitySeed>
            {
                new ApplicationRoleSeed(builder),
                new ApplicationUserSeed(builder),
            };

            foreach(var seed in seeds)
            {
                seed.Seed();
            }

            return builder;
        }
    }
}
