using CappannaHelper.Common.Core;
using CappannaHelper.Common.Persistence.Filtering;
using CappannaHelper.Common.Persistence.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace CappannaHelper.Common.Persistence.Repository;

public abstract class BaseRepository<T> : IRepository<T>
    where T: BaseEntity
{
    protected readonly DbContext _context;

    protected BaseRepository(DbContext context)
    {
        _context = context;
    }

    public virtual async Task<T> DeleteAsync(int id)
    {
        var entity = await SingleAsync(id);
        var entry = _context.Set<T>().Remove(entity);
        await _context.SaveChangesAsync();

        return entry.Entity;
    }

    public virtual async Task<PagedResult<T>> FilterAsync(IPagedSpecification<T> specification)
    {
        var baseQuery = _context.Set<T>().AsQueryable();
        var itemsQuery = specification.Build(baseQuery);
        var countQuery = specification.CountBuild(baseQuery);
        var items = await itemsQuery.ToListAsync();
        var totalCount = await countQuery.CountAsync();

        return new PagedResult<T>(specification.Page, specification.PageSize, items, totalCount);
    }

    public virtual async Task<T?> GetAsync(int id)
    {
        return await _context.Set<T>().FindAsync(id);
    }

    public virtual async Task<T> SingleAsync(int id)
    {
        var oldEntity = await GetAsync(id) ?? throw new NotFoundException($"Entity with Id = {id} does not exist");
        return oldEntity;
    }

    public virtual async Task UpsertAsync(T entity)
    {
        var isUnique = await CheckUniquenessAsync(entity);
        if (!isUnique)
        {
            throw new DuplicatedRecordException("Entity is not unique");
        }

        if (entity.Id > 0)
        {
            var oldEntity = await SingleAsync(entity.Id);
            await MergeAsync(oldEntity, entity);
        }

        _context.Set<T>().Update(entity);
        await _context.SaveChangesAsync();
    }

    protected virtual Task MergeAsync(T oldEntity, T newEntity)
    {
        _context.Entry(oldEntity).State = EntityState.Detached;
        return Task.CompletedTask;
    }

    protected abstract Task<bool> CheckUniquenessAsync(T entity);
}