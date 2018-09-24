using System;

namespace CappannaHelper.Api.Persistence.Modelling
{
    public class Notification
    {
        public const string PRINTER_STATUS_KO = "PRINTER_STATUS_KO";

        public int Id { get; set; }
        public string Type { get; set; }
        public string Message { get; set; }
        public string Notes { get; set; }
        public DateTime CreationTimestamp { get; set; }
        public bool Completed { get; set; }
    }
}