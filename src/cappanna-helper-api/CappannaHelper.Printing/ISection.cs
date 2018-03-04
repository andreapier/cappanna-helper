namespace CappannaHelper.Printing
{
    public interface ISection : IElement
    {
        bool Bold { get; set; }
        HorizontalAlignments HorizontalAlignment { get; set; }
        bool Italic { get; set; }
        Rotations Rotation { get; set; }
        int Size { get; }
        bool Underline { get; set; }

        ILabel CreateLabel();
        void NewLine();
        void SetSize(int size);
    }
}
