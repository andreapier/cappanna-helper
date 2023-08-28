using AutoMapper;
using CappannaHelper.Common.Utils;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace CappannaHelper.Common.Dtos.Extensions;

public static class DtoWebApplicationBuilderExtensions
{
    public static WebApplicationBuilder AddAppProfiles(this WebApplicationBuilder builder)
    {
        var assembliesWithProfiles = typeof(Profile).GetAssembliesWithImplementations();
        foreach (var assembly in assembliesWithProfiles)
        {
            builder.Services.AddAutoMapper(assembly);
        }

        return builder;
    }
}
