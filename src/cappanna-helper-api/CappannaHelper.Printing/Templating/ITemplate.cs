namespace CappannaHelper.Printing.Templating
{
    public interface ITemplate
    {
        IDocument Fill(DocumentData data);
    }
}