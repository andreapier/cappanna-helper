using CappannaHelper.Common.Auth;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;

namespace CappannaHelper.Common.Extensions;

public static class KeycloakWebApplicationBuilderExtensions
{
    public static WebApplicationBuilder ConfigureKeycloakAuth(this WebApplicationBuilder builder, params string[] scopes)
    {
        var authSection = builder.Configuration.GetSection("Auth");
        var authOptions = authSection.Get<AuthOptions>()!;
        builder.Services.Configure<AuthOptions>(authSection);

        builder.Services
            .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, options =>
            {
                options.Authority = authOptions.Authority;
                options.Audience = authOptions.Audience;

                options.BackchannelHttpHandler = new HttpClientHandler
                {
                    ServerCertificateCustomValidationCallback = HttpClientHandler.DangerousAcceptAnyServerCertificateValidator
                };

                options.TokenValidationParameters = new TokenValidationParameters
                {
                    //ValidateAudience = true
                };

                options.Events = new JwtBearerEvents
                {
                    OnAuthenticationFailed = async context =>
                    {
                        Console.WriteLine(context.Exception);
                        await Task.CompletedTask;
                    },
                    OnForbidden = async context =>
                    {
                        Console.WriteLine(context);
                        await Task.CompletedTask;
                    },
                    OnTokenValidated = async context =>
                    {
                        if (context.Principal?.Identity is not ClaimsIdentity claimsIdentity)
                        {
                            await Task.CompletedTask;
                            return;
                        }

                        // Split "scope" claim into multiple claims
                        // Keycloak returns scopes as space separated list, and not an array as expected by .NET
                        var scopeClaims = claimsIdentity.FindFirst("scope");
                        if (scopeClaims is null)
                        {
                            await Task.CompletedTask;
                            return;
                        }

                        claimsIdentity.RemoveClaim(scopeClaims);
                        claimsIdentity.AddClaims(scopeClaims.Value.Split(' ').Select(scope => new Claim("scope", scope)));

                        await Task.CompletedTask;
                    }
                };
            });

        builder.Services.AddAuthorization(options =>
        {
            foreach (var scope in scopes)
            {
                options.AddPolicy(AuthConstants.GetPolicyNameFromScope(scope), policy =>
                {
                    policy.RequireAuthenticatedUser();
                    policy.RequireClaim("scope", scope);
                });
            }
        });

        return builder;
    }
}
