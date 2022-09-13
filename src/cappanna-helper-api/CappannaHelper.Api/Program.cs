using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Serilog;

namespace CappannaHelper.Api
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateWebHostBuilder(args)
                .Build()
                .Run();
        }

        private static IHostBuilder CreateWebHostBuilder(string[] args) =>
            Host
                .CreateDefaultBuilder(args)
                .ConfigureAppConfiguration((ctx, builder) =>
                {
                    builder
                        .AddEnvironmentVariables()
                        .AddJsonFile("appsettings.json", false, true);
                })
                .UseSerilog((hostingContext, services, loggerConfiguration) => loggerConfiguration.ReadFrom.Configuration(hostingContext.Configuration), writeToProviders: true)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder
                        .UseIISIntegration()
                        .UseStartup<Startup>();
                });
    }
}
