using CappannaHelper.Common.Core;
using CappannaHelper.Common.Persistence.Repository;
using CappannaHelper.Common.Validation;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace CappannaHelper.Common.Http;

public class ResponseFilter : IEndpointFilter
{
    public async ValueTask<object?> InvokeAsync(EndpointFilterInvocationContext context, EndpointFilterDelegate next)
    {
		var logger = context.HttpContext.RequestServices.GetRequiredService<ILogger<ResponseFilter>>();

        try
        {
            return await next(context);
        }
        catch (ValidationException ex)
        {
            logger.LogWarning(ex, "Request completed with validation error. Returning 400 - Bad Request");
            return Results.ValidationProblem(ex.Errors);
        }
        catch (DuplicatedRecordException ex)
        {
            logger.LogWarning(ex, "Request completed with validation error. Returning 400 - Bad Request");
            return Results.Conflict(ex.Message);
        }
        catch (NotFoundException ex)
        {
            logger.LogWarning(ex, "Request completed with not found error. Returning 404 - Not Found");
            return Results.NotFound();
		}
		catch(UnauthorizedException ex)
        {
            logger.LogWarning(ex, "Request completed with unauthorized error. Returning 401 - Unahutorized");
            return Results.Unauthorized();
		}
		catch (Exception ex)
        {
            logger.LogWarning(ex, "Request completed with unhandled error. Returning 500 - Internal Server Error");
            return Results.Problem();
		}
    }
}
