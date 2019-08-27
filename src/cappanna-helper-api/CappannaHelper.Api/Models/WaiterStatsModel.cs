namespace CappannaHelper.Api.Models
{
    public class WaiterStats
    {
        public int UserId { get; set; }
        public string Waiter { get; set; }
        public int OrdersQuantity { get; set; }
        public decimal Income { get; set; }
    }
}