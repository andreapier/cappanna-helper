using AutoMapper;
using CappannaHelper.Common.Persistence.Model;
using CappannaHelper.Common.Persistence.Repository;

namespace CappannaHelper.Common.Dtos;

public class PagedResultProfile<TEntity, TDto> : Profile
    where TEntity : IEntity
    where TDto : IDto
{
    public PagedResultProfile()
    {
        CreateMap<PagedResult<TEntity>, PagedResultDto<TDto>>();
    }
}
