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
        public string Customer { get; set; }
        public IList<OrderDetail> Details { get; set; }
        public int CreatedById { get; set; }
        public ApplicationUser CreatedBy { get; set; }
        public DateTime CreationTimestamp { get; set; }
        public OperationTypes Status { get; set; }
        public string Notes { get; set; }
        public IList<ChOrderOperation> Operations { get; set; }
        public int ShiftId { get; set; }
        public Shift Shift { get; set; }
        public int ShiftCounter { get; set; }
        public int StandId { get; set; }
        public Stand Stand { get; set; }

        public ChOrder()
        {
            Details = new List<OrderDetail>();
            Operations = new List<ChOrderOperation>();
        }
    }
}