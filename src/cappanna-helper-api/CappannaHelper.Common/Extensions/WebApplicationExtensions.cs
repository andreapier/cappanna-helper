
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Logging;
using Serilog;

namespace CappannaHelper.Common.Extensions;

public static class WebApplicationExtensions
{
    public static WebApplication ConfigureBaseApp(this WebApplication app)
    {
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
            app.UseDeveloperExceptionPage();
            app.UseSerilogRequestLogging();

            IdentityModelEventSource.ShowPII = true;
        }

        return app;
    }
}