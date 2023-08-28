using CappannaHelper.Common.Persistence.Model;

namespace CappannaHelper.Tenant.Persistence.Model;

public class TenantEntity : BaseEntity
{
    public string Name { get; set; } = string.Empty;
}
