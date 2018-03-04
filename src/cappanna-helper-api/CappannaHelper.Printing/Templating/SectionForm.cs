using System.Collections.Generic;

namespace CappannaHelper.Printing.Templating
{
    public class SectionForm
    {
        public bool Bold { get; set; }
        public HorizontalAlignments HorizontalAlignment { get; set; }
        public bool Italic { get; set; }
        public Rotations Rotation { get; set; }
        public int Size { get; set; }
        public bool Underline { get; set; }
        public IList<ElementForm> Elements { get; set; }
    }
}
