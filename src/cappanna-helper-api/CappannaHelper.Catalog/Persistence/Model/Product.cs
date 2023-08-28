namespace CappannaHelper.Catalog.Persistence.Model;

public class Product
{
    public int Id { get; set; }
    public decimal Price { get; set; }
    public string Group { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public int? UnitsInStock { get; set; }
}
