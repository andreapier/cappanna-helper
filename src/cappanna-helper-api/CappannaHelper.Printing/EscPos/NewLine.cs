using System.Collections.Generic;

namespace CappannaHelper.Printing.EscPos
{
    public class NewLine : Element, INewLine
    {
        protected override void VisitInner(List<byte> commandBuilder)
        {
            commandBuilder.AddRange(Commands.LINE_FEED);
        }
    }
}
