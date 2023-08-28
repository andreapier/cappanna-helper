using AutoMapper.Execution;
using System.Linq.Expressions;
using System.Reflection;

namespace CappannaHelper.Common.Persistence.Filtering;

public class ExpressionBuilder : IExpressionBuilder
{
    private static readonly MethodInfo _containsMethod = typeof(string).GetMethod(nameof(string.Contains))!;
    private static readonly MethodInfo _startsWithMethod = typeof(string).GetMethod(nameof(string.StartsWith), new Type[] { typeof(string) })!;
    private static readonly MethodInfo _endsWithMethod = typeof(string).GetMethod(nameof(string.EndsWith), new Type[] { typeof(string) })!;

    public Expression<Func<T, bool>> GetExpression<T>(params Filter[] filters)
    {
        var filtersCopy = filters.ToList();
        var param = Expression.Parameter(typeof(T), "t");

        if (filtersCopy.Count == 0)
        {
            return PredicateBuilder.True<T>();
        }

        var expression = Expression.Equal(Expression.Constant(1), Expression.Constant(1));
        foreach (var filter in filtersCopy)
        {
            var tmpExpression = GetExpression(param, filter);
            expression = Expression.AndAlso(expression, tmpExpression);
        }

        return Expression.Lambda<Func<T, bool>>(expression, param);
    }

    private static ConstantExpression ConvetValueType(MemberExpression member, object? value)
    {
        var valueToString = value?.ToString();
        if (valueToString != null)
        {
            if (member.Type == typeof(int))
            {
                value = int.Parse(valueToString);
            }
            else if (member.Type == typeof(decimal))
            {
                value = decimal.Parse(valueToString);
            }
            else if (member.Type == typeof(float))
            {
                value = float.Parse(valueToString);
            }
            else if (member.Type == typeof(double))
            {
                value = double.Parse(valueToString);
            }
        }

        return Expression.Constant(value);
    }

    private static Expression GetExpression(ParameterExpression param, Filter filter)
    {
        var member = Expression.Property(param, filter.Property);

        return filter.Op switch
        {
            Op.Equal => Expression.Equal(member, Expression.Constant(filter.Val, member.Type)),
            Op.NotEqual => Expression.NotEqual(member, Expression.Constant(filter.Val, member.Type)),
            Op.GreaterThan => Expression.GreaterThan(member, ConvetValueType(member, filter.Val)),
            Op.GreaterThanOrEqual => Expression.GreaterThanOrEqual(member, ConvetValueType(member, filter.Val)),
            Op.LessThan => Expression.LessThan(member, ConvetValueType(member, filter.Val)),
            Op.LessThanOrEqual => Expression.LessThanOrEqual(member, ConvetValueType(member, filter.Val)),
            Op.Contains => Expression.Call(member, _containsMethod, Expression.Constant(filter.Val, member.Type)),
            Op.StartsWith => Expression.Call(member, _startsWithMethod, Expression.Constant(filter.Val, member.Type)),
            Op.EndsWith => Expression.Call(member, _endsWithMethod, Expression.Constant(filter.Val, member.Type)),
            _ => throw new InvalidOperationException($"Unhanled operation {filter.Op}"),
        };
    }

    private static BinaryExpression GetExpression(ParameterExpression param, Filter filter1, Filter filter2)
    {
        var bin1 = GetExpression(param, filter1);
        var bin2 = GetExpression(param, filter2);

        return Expression.AndAlso(bin1, bin2);
    }
}
