using CappannaHelper.Api.Common.DataModel.Seeding;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace CappannaHelper.Api.Identity.DataModel.Seeding
{
    public class ApplicationRoleSeed : EntitySeed<ApplicationRole>
    {
        public ApplicationRoleSeed(ModelBuilder builder)
            : base(builder)
        { }

        protected override ICollection<ApplicationRole> GetEntities()
        {
            return new List<ApplicationRole>
            {
                new ApplicationRole
                {
                    Id = 1,
                    Name = ApplicationRole.APPLICATION_ROLE_ADMIN
                },
                new ApplicationRole
                {
                    Id = 2,
                    Name = ApplicationRole.APPLICATION_ROLE_WAITER
                }
            };
        }
    }
}
