using CappannaHelper.Api.Identity.DataModel;
using System;
using System.Collections.Generic;

namespace CappannaHelper.Api.Persistence.Modelling
{
    public class ChOrder
    {
        public int Id { get; set; }
        public string ChTable { get; set; }
        public int Seats { get; set; }
        public IList<OrderDetail> Details { get; set; }
        public int CreatedById { get; set; }
        public ApplicationUser CreatedBy { get; set; }
        public DateTime CreationTimestamp { get; set; }
        public int Status { get; set; }
        public string Notes { get; set; }

        public ChOrder()
        {
            Details = new List<OrderDetail>();
        }
    }
}