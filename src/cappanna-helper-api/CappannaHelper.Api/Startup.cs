using System;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
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
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

namespace CappannaHelper.Api
{
    public class Startup
    {
        private readonly IConfiguration _configuration;

        public Startup(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            var persistenceConfiguration = _configuration.GetSection("Persistence").Get<PersistenceConfiguration>();

            services
                .AddDbContext<ApplicationDbContext>(o => o.UseSqlite(persistenceConfiguration.ConnectionString));

            services.AddControllers();

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
                options.Password.RequiredLength = 5;
                options.Password.RequireUppercase = false;
                options.Password.RequireNonAlphanumeric = false;
            });

            services.ConfigureApplicationCookie(options =>
            {
                options.Cookie.Name = "CappannaHelper";
                options.Cookie.HttpOnly = true;
                options.ExpireTimeSpan = TimeSpan.FromDays(5);
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

        public void Configure(IApplicationBuilder app)
        {
            app
                .UseDefaultFiles()
                .UseStaticFiles()
                .UseSetupMiddleware()
                .UseAuthentication()
                .Use(async (context, next) =>
                 {
                     var path = context.Request.Path.Value;

                     if (!path.Contains("/api") && !path.Contains("/hubs") && path != "/")
                     {
                         context.Response.Redirect("/");

                         return;
                     }

                     await next();
                 })
                .UseMiddleware<ErrorHandlingMiddleware>()
                .UseRouting()
                .UseAuthorization()
                .UseEndpoints(endpoints =>
                {
                    endpoints.MapControllers();
                    endpoints.MapHub<ChHub>("/hubs/ch");
                });
        }
    }
}
