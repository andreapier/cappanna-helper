namespace CappannaHelper.Api.Persistence.Modelling
{
    public class OperationType
    {
        public int Id { get; set; }
        public string Description { get; set; }
    }

    public enum OperationTypes
    {
        Creation = 1,
        Print = 2
    }
}
