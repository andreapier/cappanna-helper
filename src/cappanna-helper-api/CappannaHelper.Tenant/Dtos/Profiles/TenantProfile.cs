using AutoMapper;

namespace CappannaHelper.Tenant.Dtos.Profiles;

public class TenantProfile: Profile
{
    public TenantProfile()
    {
        CreateMap<TenantEntity, TenantDto>()
            .ReverseMap();
    }
}
