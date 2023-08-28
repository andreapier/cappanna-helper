namespace CappannaHelper.Common.Persistence.Filtering;

public class Filter
{
    public string Property { get; set; } = string.Empty;
    public string Op { get; set; } = string.Empty;
    public object? Val { get; set; }
}
