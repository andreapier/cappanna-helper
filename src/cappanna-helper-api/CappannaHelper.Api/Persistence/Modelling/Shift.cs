using System;

namespace CappannaHelper.Api.Persistence.Modelling
{
    public class Shift
    {
        public int Id { get; set; }
        public DateTime OpenTimestamp { get; set; }
        public DateTime CloseTimestamp { get; set; }
        public string Description { get; set; }
        public int OrderCounter { get; set; }
        public decimal Income { get; set; }
    }
}
