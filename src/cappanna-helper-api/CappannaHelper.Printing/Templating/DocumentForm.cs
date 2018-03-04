using System.Collections.Generic;

namespace CappannaHelper.Printing.Templating
{
    public class DocumentForm
    {
        public int CopyNumber { get; set; }
        public List<PageForm> Pages { get; set; }
        public string Type { get; set; }
    }
}
