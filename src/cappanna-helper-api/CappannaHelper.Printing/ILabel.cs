namespace CappannaHelper.Printing
{
    public interface ILabel : IElement
    {
        string Content { get; }
        
        ILabel SetContent(string content);
    }
}
