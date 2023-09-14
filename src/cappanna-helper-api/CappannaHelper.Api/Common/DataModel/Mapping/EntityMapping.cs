using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CappannaHelper.Api.Common.DataModel.Mapping
{
    public abstract class EntityMapping<T> : IEntityMapping where T : class
    {
        private readonly ModelBuilder _builder;

        protected EntityMapping(ModelBuilder builder)
        {
            _builder = builder;
        }

        public void Build()
        {
            _builder.Entity<T>(BuildEntityConfiguration);
        }

        protected abstract void BuildEntityConfiguration(EntityTypeBuilder<T> entityBuilder);
    }
}