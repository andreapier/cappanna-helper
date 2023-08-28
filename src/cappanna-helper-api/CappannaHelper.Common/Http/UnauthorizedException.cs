namespace CappannaHelper.Common.Http;

public class UnauthorizedException : Exception
{
    public UnauthorizedException(string message) : base(message)
    { }
}
