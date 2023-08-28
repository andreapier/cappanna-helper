namespace CappannaHelper.Events.Tenants;

public record TenantCreated
{
    public int Id { get; init; }
    public string Name { get; init; }
}
