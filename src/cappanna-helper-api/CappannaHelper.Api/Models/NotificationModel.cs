namespace CappannaHelper.Api.Models
{
    public class NotificationModel
    {
        public const string ORDER_NOTIFICATION = "order";

        public string Type { get; set; }
        public int OrderId { get; set; }
        public decimal TotalPrice { get; set; }
        public string Username { get; set; }
    }
}
