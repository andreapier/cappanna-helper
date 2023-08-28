using FluentValidation;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;

namespace CappannaHelper.Common.Validation;

public class ValidationFilter<T> : IEndpointFilter
{
    public async ValueTask<object?> InvokeAsync(EndpointFilterInvocationContext context, EndpointFilterDelegate next)
    {
        var dto = context.GetArgument<T>(0);
        var validator = context.HttpContext.RequestServices.GetRequiredService<IValidator<T>>();

        var validationResult = await validator.ValidateAsync(dto);
        if (!validationResult.IsValid)
        {
            throw new ValidationException("Invalid request", validationResult.ToDictionary());
        }

        return await next.Invoke(context);
    }
}
