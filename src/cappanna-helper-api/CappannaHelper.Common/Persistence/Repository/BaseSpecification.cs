using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;

namespace CappannaHelper.Common.Persistence.Repository;

public class BaseSpecification<T> : ISpecification<T>
    where T : class
{
    private readonly List<Expression<Func<T, bool>>> _criterias = new();
    private readonly List<Expression<Func<T, object>>> _includes = new();
    private readonly List<Expression<Func<T, object>>> _orderBy = new();
    private readonly List<Expression<Func<T, object>>> _orderByDescending = new();

    public void AddCriteria(Expression<Func<T, bool>> criteriaExpression)
    {
        _criterias.Add(criteriaExpression);
    }

    public void AddInclude(Expression<Func<T, object>> includeExpression)
    {
        _includes.Add(includeExpression);
    }

    public void AddOrderBy(Expression<Func<T, object>> orderByExpression)
    {
        _orderBy.Add(orderByExpression);
    }

    public void AddOrderByDescending(Expression<Func<T, object>> orderByExpression)
    {
        _orderByDescending.Add(orderByExpression);
    }

    public virtual IQueryable<T> Build(IQueryable<T> query)
    {
        query = _criterias.Aggregate(query, (current, item) => current.Where(item));
        query = _orderBy.Aggregate(query, (current, item) => current.OrderBy(item));
        query = _orderByDescending.Aggregate(query, (current, item) => current.OrderByDescending(item));
        query = _includes.Aggregate(query, (current, item) => current.Include(item));

        return query;
    }
}
