using CappannaHelper.Api.Identity.DataModel;
using System;

namespace CappannaHelper.Api.Persistence.Modelling
{
    public class Shift
    {
        public int Id { get; set; }
        public DateTime OpenTimestamp { get; set; }
        public int CreatedById { get; set; }
        public ApplicationUser CreatedBy { get; set; }
        public DateTime CreationTimestamp { get; set; }
        public string Description { get; set; }
    }
}
