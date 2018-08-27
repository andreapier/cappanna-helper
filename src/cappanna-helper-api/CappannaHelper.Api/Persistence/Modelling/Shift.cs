using CappannaHelper.Api.Identity.DataModel;
using System;

namespace CappannaHelper.Api.Persistence.Modelling
{
    public class Shift
    {
        public int Id { get; set; }
        public DateTime OpenTimestamp { get; set; }
        public string Description { get; set; }
        public int OrderCounter { get; set; }
    }
}
