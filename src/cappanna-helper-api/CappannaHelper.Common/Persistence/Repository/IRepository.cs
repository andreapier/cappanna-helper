using CappannaHelper.Common.Persistence.Model;

namespace CappannaHelper.Common.Persistence.Repository;

public interface IRepository<T>
    where T: BaseEntity
{
    Task<T> DeleteAsync(int id);
    Task<PagedResult<T>> FilterAsync(IPagedSpecification<T> specification);
    Task<T?> GetAsync(int id);
    Task<T> SingleAsync(int id);
    Task UpsertAsync(T entity);
}
