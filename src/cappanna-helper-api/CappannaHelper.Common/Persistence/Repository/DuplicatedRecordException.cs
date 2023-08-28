namespace CappannaHelper.Common.Persistence.Repository;

public class DuplicatedRecordException : Exception
{
    public DuplicatedRecordException(string message) : base(message)
    { }
}
