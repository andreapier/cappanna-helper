namespace CappannaHelper.Common;

public class ConfigurationMissingException : Exception
{
    public ConfigurationMissingException(string message) : base(message)
    {
    }
}
