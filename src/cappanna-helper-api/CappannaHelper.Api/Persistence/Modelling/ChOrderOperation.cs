using CappannaHelper.Api.Identity.DataModel;
using System;

namespace CappannaHelper.Api.Persistence.Modelling
{
    public class ChOrderOperation
    {
        public int Id { get; set; }
        public DateTime OperationTimestamp { get; set; }
        public int OrderId { get; set; }
        public OperationTypes Type { get; set; }
        public int UserId { get; set; }
        public ApplicationUser User { get; set; }
    }
}
