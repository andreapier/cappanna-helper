namespace CappannaHelper.Common.Persistence.Repository;

public interface IPagedSpecification<T> : ISpecification<T>
    where T : class
{
    int Page { get; set; }
    int PageSize { get; set; }

    IQueryable<T> CountBuild(IQueryable<T> query);
}