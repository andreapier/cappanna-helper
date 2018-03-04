using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;

namespace CappannaHelper.Api.Common.DataModel.Mapping
{
    public abstract class BaseMapping<T> where T : class
    {
        private readonly ModelBuilder _builder;

        protected BaseMapping(ModelBuilder builder)
        {
            if (builder == null)
            {
                throw new ArgumentNullException(nameof(builder));
            }

            _builder = builder;
        }

        public void Build()
        {
            _builder.Entity<T>(e => BuildEntityConfiguration(e));
        }

        protected abstract void BuildEntityConfiguration(EntityTypeBuilder<T> entityBuilder);
    }
}