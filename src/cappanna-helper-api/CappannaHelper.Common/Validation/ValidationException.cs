namespace CappannaHelper.Common.Validation;

public class ValidationException : Exception
{
    public IDictionary<string, string[]> Errors { get; init; }

    public ValidationException(string message, IDictionary<string, string[]> errors) : base(message)
    {
        Errors = errors;
    }
}