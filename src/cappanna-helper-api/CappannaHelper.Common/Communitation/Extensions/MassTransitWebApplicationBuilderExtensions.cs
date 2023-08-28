using MassTransit;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace CappannaHelper.Common.Communitation.Extensions;

public static class MassTransitWebApplicationBuilderExtensions
{
    public static WebApplicationBuilder AddBaseMassTransit(this WebApplicationBuilder builder)
    {
        var massTransitSection = builder.Configuration.GetSection("MassTransit");
        var massTransitOptions = massTransitSection.Get<MassTransitOptions>()!;

        builder.Services.Configure<MassTransitOptions>(massTransitSection);
        builder.Services.AddMassTransit(x =>
        {
            x.UsingRabbitMq((context, cfg) =>
            {
                cfg.Host(massTransitOptions.Host, massTransitOptions.Port, massTransitOptions.VHost, h =>
                {
                    h.Username(massTransitOptions.Username);
                    h.Password(massTransitOptions.Password);
                });

                cfg.ConfigureEndpoints(context);
            });
        });

        return builder;
    }
}
