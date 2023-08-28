using CappannaHelper.Common.Extensions;
using CappannaHelper.Common.Persistence.Seeding;
using CappannaHelper.Tenant;
using CappannaHelper.Tenant.Auth;
using CappannaHelper.Tenant.Services;

var builder = WebApplication.CreateBuilder(args);

builder
    .ConfigureBaseApp<AppDbContext>()
    .ConfigureKeycloakAuth(AppScopes.SCOPE_TENANT_READ, AppScopes.SCOPE_TENANT_WRITE);

builder.Services.AddScoped<ITenantService, TenantService>();

var app = builder.Build();

app
    .ConfigureBaseApp();

app
    .UseAuthentication()
    .UseAuthorization();

app.MapTenantEndpoints();

await using var scope = app.Services.CreateAsyncScope();
var seedUnitRunner = scope.ServiceProvider.GetRequiredService<ISeedUnitRunner>();
await seedUnitRunner.SeedAsync();

app.Run();
