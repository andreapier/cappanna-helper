namespace CappannaHelper.Common.Persistence.Repository;

public record PagedResult<T>(int Page, int PageSize, IEnumerable<T> Items, int TotalCount);