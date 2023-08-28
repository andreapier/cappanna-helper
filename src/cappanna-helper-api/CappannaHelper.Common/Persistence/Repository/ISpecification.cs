namespace CappannaHelper.Common.Persistence.Repository;

public interface ISpecification<T>
    where T : class
{
    IQueryable<T> Build(IQueryable<T> query);
}
