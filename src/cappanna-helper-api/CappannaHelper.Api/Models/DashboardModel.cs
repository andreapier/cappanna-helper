using System.Collections.Generic;

namespace CappannaHelper.Api.Models
{
    public class DashboardModel
    {
        public IList<OrderStat> OrderStats { get; set; }
        public decimal Income { get; set; }
        public IList<WaiterStats> WaitersStats { get; set; }

        public DashboardModel()
        {
            OrderStats = [];
            WaitersStats = [];
        }
    }
}
