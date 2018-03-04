using System.Collections.Generic;

namespace CappannaHelper.Printing
{
    public interface IElement
    {
        void Visit(List<byte> commandBuilder);
    }
}
