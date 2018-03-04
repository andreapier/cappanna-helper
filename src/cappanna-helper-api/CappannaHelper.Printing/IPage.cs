namespace CappannaHelper.Printing
{
    public interface IPage : IElement
    {
        ISection DefaultSection { get; }

        ISection CreateSection();
    }
}