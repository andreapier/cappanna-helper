using CappannaHelper.Api.Common.ErrorManagement;
using CappannaHelper.Api.Hubs;
using CappannaHelper.Api.Identity.DataModel;
using CappannaHelper.Api.Identity.Extensions;
using CappannaHelper.Api.Persistence;
using CappannaHelper.Api.Services.Extensions;
using CappannaHelper.Api.Setup.Extensions;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();
builder.Services
    .AddSignalR()
    .AddJsonProtocol();

JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();
builder.Services
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
            ValidIssuer = builder.Configuration.GetValue<string>("JwtIssuer"),
            ValidAudience = builder.Configuration.GetValue<string>("JwtIssuer"),
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration.GetValue<string>("JwtKey"))),
            ClockSkew = TimeSpan.Zero
        };
    });
builder.Services.ConfigureApplicationCookie(options =>
{
    options.Cookie.Name = "CappannaHelper";
    options.Cookie.HttpOnly = true;
    options.ExpireTimeSpan = TimeSpan.FromDays(5);
    options.SlidingExpiration = true;
});

var persistenceConfiguration = builder.Configuration.GetSection("Persistence").Get<PersistenceConfiguration>();

builder.Services.AddDbContext<ApplicationDbContext>(o => o.UseSqlite(persistenceConfiguration.ConnectionString));
builder.Services
    .AddIdentity<ApplicationUser, ApplicationRole>()
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders();

builder.Services.AddApplicationIdentity();
builder.Services.Configure<IdentityOptions>(options =>
{
    options.Password.RequireDigit = false;
    options.Password.RequiredLength = 5;
    options.Password.RequireUppercase = false;
    options.Password.RequireNonAlphanumeric = false;
});

builder.Services
    .AddSetup()
    .AddChServices();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

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

app.Run();
