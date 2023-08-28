using CappannaHelper.Common.Core;
using CappannaHelper.Common.Persistence.Filtering;
using CappannaHelper.Common.Persistence.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace CappannaHelper.Common.Persistence.Repository;

public class EfModelInspectionBaseRepository<T> : BaseRepository<T>
    where T : BaseEntity
{
    protected readonly IExpressionBuilder _expressionBuilder;

    public EfModelInspectionBaseRepository(DbContext context, IExpressionBuilder expressionBuilder)
        : base(context)
    {
        _expressionBuilder = expressionBuilder;
    }

    protected override async Task<bool> CheckUniquenessAsync(T entity)
    {
        var metadata = GetModelMetadata();
        var indexes = metadata.GetIndexes();
        var uniqueIndexes = indexes.Where(x => x.IsUnique);
        var expression = PredicateBuilder.False<T>();

        foreach (var uniqueIndex in uniqueIndexes)
        {
            var filters = new List<Filter>
            {
                new Filter
                {
                    Op = Op.NotEqual,
                    Property = nameof(IIdObject.Id),
                    Val = entity.Id,
                },
            };

            foreach (var property in uniqueIndex.Properties)
            {
                if (property.PropertyInfo == null)
                {
                    throw new InvalidOperationException("Model base inspection is only supported for property mappings");
                }

                var getter = property.GetGetter();
                var value = getter.GetClrValue(entity);
                filters.Add(new Filter
                {
                    Op = Op.Equal,
                    Property = property.PropertyInfo.Name,
                    Val = value,
                });
            }

            var indexExpression = _expressionBuilder.GetExpression<T>(filters.ToArray());
            expression = expression.Or(indexExpression);
        }

        return !await _context.Set<T>().Where(expression).AnyAsync();
    }

    private IEntityType GetModelMetadata()
    {
        var entityType = typeof(T);
        var metadata = _context.Model.FindEntityType(entityType)
            ?? throw new InvalidOperationException($"Cannot inspect model for non mapped entity '{entityType.AssemblyQualifiedName}'");
        return metadata;
    }

    private static IKey GetPrimaryKey(IEntityType metadata)
    {
        return metadata.FindPrimaryKey()
            ?? throw new InvalidOperationException($"Cannot inspect model for entity without primary key: '{metadata.ClrType.AssemblyQualifiedName}'");
    }
}
