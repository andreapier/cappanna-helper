using CappannaHelper.Api.Common.ErrorManagement;
using CappannaHelper.Api.Hubs;
using CappannaHelper.Api.Identity.DataModel;
using CappannaHelper.Api.Identity.Extensions;
using CappannaHelper.Api.Persistence;
using CappannaHelper.Api.Printing;
using CappannaHelper.Api.Printing.Extensions;
using CappannaHelper.Api.Services.Extensions;
using CappannaHelper.Api.Setup.Extensions;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

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
                .AddJsonFile("appsettings.json")
                .AddEnvironmentVariables();

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
            services
                .AddEntityFrameworkNpgsql()
                .AddDbContext<ApplicationDbContext>(o =>
                {
                    var user = Environment.GetEnvironmentVariable("POSTGRES_USER");
                    var pwd = Environment.GetEnvironmentVariable("POSTGRES_PASSWORD");
                    var db = Environment.GetEnvironmentVariable("POSTGRES_DB");

                    o.UseNpgsql($"Host=db;Port=5432;Database={db};Username={user};Password={pwd}");
                });

            services
                .AddMvc()
                .SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

            services
                .AddIdentity<ApplicationUser, ApplicationRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();

            services.AddApplicationIdentity();

            JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();
            services
                .AddAuthentication(options =>
                {
                    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

                })
                .AddJwtBearer(cfg =>
                {
                    cfg.RequireHttpsMetadata = false;
                    cfg.SaveToken = true;
                    cfg.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidIssuer = _configuration["JwtIssuer"],
                        ValidAudience = _configuration["JwtIssuer"],
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtKey"])),
                        ClockSkew = TimeSpan.Zero
                    };
                });

            services.Configure<IdentityOptions>(options =>
            {
                options.Password.RequireDigit = false;
                options.Password.RequiredLength = 8;
                options.Password.RequireUppercase = false;
                options.Password.RequireNonAlphanumeric = false;

                options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(30);
                options.Lockout.MaxFailedAccessAttempts = 5;
            });

            services.ConfigureApplicationCookie(options =>
            {
                options.Cookie.Name = "CappannaHelper";
                options.Cookie.HttpOnly = true;
                options.Cookie.Expiration = TimeSpan.FromDays(1);
                options.SlidingExpiration = true;
            });

            services
                .AddSignalR()
                .AddJsonProtocol();

            services.Configure<PrintingConfiguration>(_configuration.GetSection("Printing"));

            services
                .AddPrinting()
                .AddSetup()
                .AddChServices();
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app
                .UseDefaultFiles()
                .UseStaticFiles()
                .UseSetupMiddleware()
                .UseAuthentication()
                .UseSignalR(routes =>
                {
                    routes.MapHub<ChHub>("/hubs/ch");
                })
				.Use(async (context, next) =>
				 {
					if (!context.Request.Path.Value.Contains("/api") && !context.Request.Path.Value.Contains("/hubs"))
					{
						context.Response.Redirect("/");
						return;
					}
					await next();
				 })
                .UseMiddleware<ErrorHandlingMiddleware>()
                .UseMvc();
        }
    }
}
