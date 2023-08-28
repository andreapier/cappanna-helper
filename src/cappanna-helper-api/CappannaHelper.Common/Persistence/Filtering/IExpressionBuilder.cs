using System.Linq.Expressions;

namespace CappannaHelper.Common.Persistence.Filtering;

public interface IExpressionBuilder
{
    Expression<Func<T, bool>> GetExpression<T>(params Filter[] filters);
}