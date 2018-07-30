using CappannaHelper.Api.Common.DataModel.Mapping;
using CappannaHelper.Api.Identity.DataModel.Mapping;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace CappannaHelper.Api.Identity.Extensions
{
    public static class IdentityModelBuilderExtensions
    {
        public static ModelBuilder MapIdentityEntities(this ModelBuilder builder)
        {
            var mappings = new List<IEntityMapping>
            {
                new ApplicationRoleMapping(builder),
                new ApplicationUserMapping(builder),
                new ApplicationUserRoleMapping(builder),
                new ApplicationRoleClaimMapping(builder),
                new UserLoginMapping(builder),
                new UserLoginMapping(builder),
                new UserTokenMapping(builder)
            };

            foreach(var mapping in mappings)
            {
                mapping.Build();
            }

            return builder;
        }
    }
}