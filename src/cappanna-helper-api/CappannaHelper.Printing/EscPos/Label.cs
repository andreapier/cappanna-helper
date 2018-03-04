using System;
using System.Collections.Generic;
using System.Text;

namespace CappannaHelper.Printing.EscPos
{
    public class Label : Element, ILabel
    {
        public string Content { get; private set; }

        public Label()
        {
            Content = string.Empty;
        }
        
        public ILabel SetContent(string content)
        {
            Content = content ?? throw new ArgumentNullException(nameof(content));

            return this;
        }

        protected override void VisitInner(List<byte> commandBuilder)
        {
            commandBuilder.AddRange(Commands.CPI_0);
            commandBuilder.AddRange(Encoding.ASCII.GetBytes(Content));
        }
    }
}
