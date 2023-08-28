namespace CappannaHelper.Common.Dtos;

public class PagedResultDto<T>
    where T : IDto
{
    public IEnumerable<T> Items { get; set; } = Enumerable.Empty<T>();
    public int TotalCount { get; set; }
}