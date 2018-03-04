using System;
using System.Collections.Generic;

namespace CappannaHelper.Printing.EscPos
{
    public abstract class Element : IElement
    {
        public void Visit(List<byte> commandBuilder)
        {
            if (commandBuilder == null)
            {
                throw new ArgumentNullException(nameof(commandBuilder));
            }

            VisitInner(commandBuilder);
        }

        protected abstract void VisitInner(List<byte> commandBuilder);
    }
}
