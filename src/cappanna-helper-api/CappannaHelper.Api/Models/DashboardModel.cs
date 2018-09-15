using System.Collections.Generic;

namespace CappannaHelper.Api.Models
{
    public class DashboardModel
    {
        public int OrdersQuantity { get; set; }
        public decimal Income { get; set; }
        public IList<WaiterStats> WaitersStats { get; set; }

        public DashboardModel()
        {
            WaitersStats = new List<WaiterStats>();
        }
    }
}
