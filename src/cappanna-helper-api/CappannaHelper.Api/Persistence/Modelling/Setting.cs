namespace CappannaHelper.Api.Persistence.Modelling {
    public class Setting
    {
        public const string AUTO_PRINT = "AUTO_PRINT";

        public int Id { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public string Value { get; set; }
    }
}
