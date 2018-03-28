using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;

namespace CappannaHelper.Api.Common.DataModel.Seeding
{
    public abstract class EntitySeed<T> : IEntitySeed where T : class
    {
        private readonly ModelBuilder _builder;

        protected EntitySeed(ModelBuilder builder)
        {
            _builder = builder ?? throw new ArgumentNullException(nameof(builder));
        }

        public void Seed()
        {
            var entities = GetEntities();
            _builder.Entity<T>().SeedData(entities);
        }

        protected abstract ICollection<T> GetEntities();
    }
}
