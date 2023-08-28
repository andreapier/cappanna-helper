using AutoMapper;
using CappannaHelper.Common.Auth;
using CappannaHelper.Common.Http;
using CappannaHelper.Common.Persistence;
using CappannaHelper.Common.Validation;
using CappannaHelper.Tenant.Auth;
using CappannaHelper.Tenant.Services;

namespace CappannaHelper.Tenant;

public static class TenantEndpointExtensions
{
    public static WebApplication MapTenantEndpoints(this WebApplication app)
    {
        var builder = app
            .MapGroup("")
            .AddEndpointFilter<ResponseFilter>()
            .AddEndpointFilter<TransactionFilter>();

        builder
            .MapGet("/paged/{page?}", GetTenantsAsync)
            .RequireAuthorization(AuthConstants.GetPolicyNameFromScope(AppScopes.SCOPE_TENANT_READ));

        builder
            .MapGet("/{id}", async (int id, ITenantService service, IMapper mapper) =>
            {
                var entity = await service.FindAsync(id);
                if (entity == null)
                {
                    return Results.NotFound();
                }

                var dto = mapper.Map<TenantDto>(entity);
                return Results.Ok(dto);
            })
            .RequireAuthorization(AuthConstants.GetPolicyNameFromScope(AppScopes.SCOPE_TENANT_READ));

        builder
            .MapPost("/", async (TenantDto dto, ITenantService service, IMapper mapper) =>
            {
                var isInsert = dto.Id == 0;
                var entity = mapper.Map<TenantEntity>(dto);

                await service.UpsertAsync(entity);
                dto = mapper.Map<TenantDto>(entity);

                return isInsert
                    ? Results.Created($"/{entity.Id}", dto)
                    : Results.Ok(dto);
            })
            .RequireAuthorization(AuthConstants.GetPolicyNameFromScope(AppScopes.SCOPE_TENANT_WRITE))
            .AddEndpointFilter<ValidationFilter<TenantDto>>();

        builder
            .MapDelete("/{id}", async (int id, ITenantService service) =>
            {
                await service.DeleteAsync(id);
                return Results.NoContent();
            })
            .RequireAuthorization(AuthConstants.GetPolicyNameFromScope(AppScopes.SCOPE_TENANT_WRITE));

        return app;
    }

    private static async Task<IResult> GetTenantsAsync(ITenantService service, IMapper mapper, int page = 1, int pageSize = 100, string name = "")
    {
        var entities = await service.FilterAsync(page, pageSize, name);
        var dtos = mapper.Map<IEnumerable<TenantDto>>(entities.Items);

        return Results.Ok(dtos);
    }
}
