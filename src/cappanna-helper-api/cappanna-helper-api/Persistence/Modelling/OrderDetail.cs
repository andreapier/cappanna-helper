using System;

namespace CappannaHelper.Api.Persistence.Modelling
{
    public class OrderDetail
    {
        public int Id { get; set; }
        public int Quantity { get; set; }
        public DateTime CreationTimestamp { get; set; }
        public int ItemId { get; set; }
        public MenuDetail Item { get; set; }
        public int OrderId { get; set; }
    }
}