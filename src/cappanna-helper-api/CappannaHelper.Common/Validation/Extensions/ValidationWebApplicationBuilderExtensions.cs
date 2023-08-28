using CappannaHelper.Common.Utils;
using FluentValidation;
using Microsoft.AspNetCore.Builder;

namespace CappannaHelper.Common.Validation.Extensions;

public static class ValidationWebApplicationBuilderExtensions
{
    public static WebApplicationBuilder AddAppValidators(this WebApplicationBuilder builder)
    {
        var assembliesWithValidators = typeof(IValidator<>).GetAssembliesWithImplementations();
        foreach (var assembly in assembliesWithValidators)
        {
            builder.Services.AddValidatorsFromAssembly(assembly);
        }

        return builder;
    }
}
