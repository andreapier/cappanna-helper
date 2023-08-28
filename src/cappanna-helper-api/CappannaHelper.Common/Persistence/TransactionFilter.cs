using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace CappannaHelper.Common.Persistence;

public class TransactionFilter<T> : IEndpointFilter
    where T : DbContext
{
    public async ValueTask<object?> InvokeAsync(EndpointFilterInvocationContext context, EndpointFilterDelegate next)
    {
        var dbContext = context.HttpContext.RequestServices.GetRequiredService<T>();
        var logger = context.HttpContext.RequestServices.GetRequiredService<ILogger<TransactionFilter<T>>>();

        logger.LogDebug("Opening transaction");
        using var trx = await dbContext.Database.BeginTransactionAsync();
        try
        {
            var result = await next(context);

            logger.LogDebug("Operation completed without errors => Commit transaction");
            await trx.CommitAsync();

            return result;
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Operation completed with errors => Rollback transaction");
            await trx.RollbackAsync();
            throw;
        }
    }
}

public class TransactionFilter : TransactionFilter<BaseDbContext>
{ }
