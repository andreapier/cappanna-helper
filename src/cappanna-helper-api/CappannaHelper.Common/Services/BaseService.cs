using CappannaHelper.Common.Persistence.Model;
using CappannaHelper.Common.Persistence.Repository;

namespace CappannaHelper.Common.Services;

public class BaseService<T> : IService<T> where T : BaseEntity
{
    protected readonly IRepository<T> _repo;

    public BaseService(IRepository<T> repo)
    {
        _repo = repo;
    }

    public async Task<T> DeleteAsync(int id)
    {
        return await _repo.DeleteAsync(id);
    }

    public async Task<T?> FindAsync(int id)
    {
        return await _repo.GetAsync(id);
    }

    public async Task<T> SingleAsync(int id)
    {
        return await _repo.SingleAsync(id);
    }

    public async Task UpsertAsync(T entity)
    {
        await _repo.UpsertAsync(entity);
    }
}
