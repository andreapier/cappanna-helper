namespace CappannaHelper.Api.Persistence.Modelling
{
    public class Stand
    {
        public const string KEY_CUPRA = "CUPRA";
        public const string KEY_ZENA = "ZENA";

        public int Id { get; set; }
        public string Description { get; set; }
        public string PrintLabel { get; set; }
    }
}
