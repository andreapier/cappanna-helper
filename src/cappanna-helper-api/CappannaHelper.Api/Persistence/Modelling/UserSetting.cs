namespace CappannaHelper.Api.Persistence.Modelling
{
    public class UserSetting
    {
        public const string WORKSTATION = "WORKSTATION";

        public int Id { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public string Value { get; set; }
        public int UserId { get; set; }
    }
}
