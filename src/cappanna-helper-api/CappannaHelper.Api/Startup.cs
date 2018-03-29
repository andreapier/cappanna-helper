using CappannaHelper.Api.Hubs;
using CappannaHelper.Api.Identity.DataModel;
using CappannaHelper.Api.Identity.Extensions;
using CappannaHelper.Api.Persistence;
using CappannaHelper.Api.Printing;
using CappannaHelper.Api.Printing.Extensions;
using CappannaHelper.Api.Setup.Extensions;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;

namespace CappannaHelper.Api
{
    public class Startup
    {
        private readonly IHostingEnvironment _environment;
        private readonly IConfiguration _configuration;

        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json");

            if (env.IsDevelopment())
            {
                builder.AddUserSecrets<Startup>();
            }

            builder.AddEnvironmentVariables();

            _environment = env;
            _configuration = builder.Build();
        }

        public void ConfigureServices(IServiceCollection services)
        {
            var persistenceConfiguration = _configuration.GetSection("Persistence").Get<PersistenceConfiguration>();

            services.AddEntityFrameworkSqlite().AddDbContext<ApplicationDbContext>(o => o.UseSqlite(persistenceConfiguration.ConnectionString));
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
            services.AddIdentity<ApplicationUser, ApplicationRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();
            services.AddApplicationIdentity();

            services.Configure<IdentityOptions>(options =>
            {
                options.Password.RequireDigit = false;
                options.Password.RequiredLength = 8;
                options.Password.RequireUppercase = false;
                options.Password.RequireNonAlphanumeric = false;

                options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(30);
                options.Lockout.MaxFailedAccessAttempts = 5;

                options.User.RequireUniqueEmail = true;
            });

            services.ConfigureApplicationCookie(options =>
            {
                options.Cookie.Name = "CappannaHelper";
                options.Cookie.HttpOnly = true;
                options.Cookie.Expiration = TimeSpan.FromDays(1);
                options.SlidingExpiration = true;
            });
            services.AddSignalR();

            services.Configure<PrintingConfiguration>(_configuration.GetSection("Printing"));
            services.AddPrinting();
            services.AddSetup();
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.UseSetupMiddleware();
            app.UseHsts();
            app.UseHttpsRedirection();
            app.UseMvc();
            app.UseAuthentication();
            app.UseSignalR(routes =>
            {
                routes.MapHub<MenuHub>("/menu");
            });
        }
    }
}
