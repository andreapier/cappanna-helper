﻿namespace CappannaHelper.Api.Persistence.Modelling
{
    public class OperationType
    {
        public int Id { get; set; }
        public string Description { get; set; }
    }

    public enum OperationTypes
    {
        Creation = 1,
        Edit = 2,
        Print = 3,
        Close = 4
    }
}
