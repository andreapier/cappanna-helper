using CappannaHelper.Common.Persistence.Repository;
using CappannaHelper.Common.Services;

namespace CappannaHelper.Tenant.Services;

public class TenantService : BaseService<TenantEntity>, ITenantService
{
    public TenantService(IRepository<TenantEntity> repo)
        : base(repo)
    { }

    public async Task<PagedResult<TenantEntity>> FilterAsync(int page, int pageSize, string name)
    {
        var pageSpecification = new PagedSpecification<TenantEntity>
        {
            Page = page,
            PageSize = pageSize,
        };
        pageSpecification.AddOrderBy(x => x.Name);

        if (!string.IsNullOrWhiteSpace(name))
        {
            pageSpecification.AddCriteria(x => x.Name.Contains(name));
        }

        return await _repo.FilterAsync(pageSpecification);
    }
}