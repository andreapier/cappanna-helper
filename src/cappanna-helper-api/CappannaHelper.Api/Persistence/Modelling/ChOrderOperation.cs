using System;

namespace CappannaHelper.Api.Persistence.Modelling
{
    public class ChOrderOperation
    {
        public int Id { get; set; }
        public DateTime OperationTimestamp { get; set; }
        public int OrderId { get; set; }
        public ChOrder Order { get; set; }
        public int TypeId { get; set; }
        public OperationType Type { get; set; }
    }
}
