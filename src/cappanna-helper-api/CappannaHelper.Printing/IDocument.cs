namespace CappannaHelper.Printing
{
    public interface IDocument
    {
        int CopyNumber { get; }
        IPage DefaultPage { get; }
        IPage LastPage { get; }

        IPage CreatePage();
        byte[] Render();
        IDocument SetCopyNumber(int copyNumber);
    }
}
