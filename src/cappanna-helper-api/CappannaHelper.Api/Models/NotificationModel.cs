using CappannaHelper.Printing;

namespace CappannaHelper.Api.Models
{
    public class NotificationModel
    {
        public const string ORDER_NOTIFICATION = "ORDER";
        public const string PRINTER_STATUS_NOTIFICATION = "PRINTER_STATUS";

        public string Type { get; set; }
        public int OrderId { get; set; }
        public decimal TotalPrice { get; set; }
        public string Username { get; set; }
        public IStatus PrinterStatus { get; set; }
    }
}
