using CappannaHelper.Common.Persistence.Repository;
using CappannaHelper.Common.Services;

namespace CappannaHelper.Tenant.Services;

public interface ITenantService : IService<TenantEntity>
{
    Task<PagedResult<TenantEntity>> FilterAsync(int page, int pageSize, string name);
}
