namespace CappannaHelper.Common.Persistence.Repository;

public class PagedSpecification<T> : BaseSpecification<T>, IPagedSpecification<T>
    where T : class
{
    public int Page { get; set; }
    public int PageSize { get; set; }

    public override IQueryable<T> Build(IQueryable<T> query)
    {
        query = base.Build(query);
        query = query
            .Skip((Page - 1) * PageSize)
            .Take(PageSize);

            return query;
    }

    public IQueryable<T> CountBuild(IQueryable<T> query)
    {
        return base.Build(query);
    }
}