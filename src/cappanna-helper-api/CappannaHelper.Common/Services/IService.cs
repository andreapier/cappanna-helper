using CappannaHelper.Common.Core;

namespace CappannaHelper.Common.Services;

public interface IService<T> where T : IIdObject
{
    Task<T> DeleteAsync(int id);
    Task<T?> FindAsync(int id);
    Task<T> SingleAsync(int id);
    Task UpsertAsync(T entity);
}