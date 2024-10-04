using System.Collections.Generic;

namespace CappannaHelper.Api.Models;

public class OrderDetailsAggregateModel
{
    public string Title { get; set; }
    public List<OrderDetailsAggregateItem> Details { get; set; } = [];
}

public class OrderDetailsAggregateItem
{
    public int ItemId { get; set; }
    public string Name { get; set; }
    public int Quantity { get; set; }
}