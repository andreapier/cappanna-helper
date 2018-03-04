using System.Collections.Generic;
using System.Linq;

namespace CappannaHelper.Printing.EscPos
{
    public class Page : Element, IPage
    {
        private readonly List<Section> _sections;

        public ISection DefaultSection => _sections.First();

        public Page()
        {
            _sections = new List<Section>();
            CreateSection();
        }

        public ISection CreateSection()
        {
            var result =  new Section();
            _sections.Add(result);

            return result;
        }

        protected override void VisitInner(List<byte> commandBuilder)
        {
            foreach(var section in _sections)
            {
                section.Visit(commandBuilder);
            }

            commandBuilder.AddRange(Commands.CUT_PARTIAL);
        }
    }
}
