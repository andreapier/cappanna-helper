using System.Collections.Generic;
using System.Linq;
using CappannaHelper.Api.Models;
using CappannaHelper.Printing;
using CappannaHelper.Printing.EscPos;

namespace CappannaHelper.Api.Printing
{
    public class OrderDetailsAggregateDocumentBuilder: IPrinterDocumentBuilder<List<OrderDetailsAggregateModel>>
    {
        private readonly Document _document;

        public OrderDetailsAggregateDocumentBuilder()
        {
            _document = new Document();
        }

        public IPrinterDocumentBuilder<List<OrderDetailsAggregateModel>> SetData(List<OrderDetailsAggregateModel> aggregation)
        {
            SetTitle("Primi piatti");
            SetAggregates(aggregation);
            BlankFeed(12);
            
            return this;
        }

        private void SetTitle(string title)
        {
            var section = _document.LastPage.CreateSection();
            section.SetSize(24);
            section.HorizontalAlignment = HorizontalAlignments.Center;
            section.Bold = true;
            section.CreateLabel().SetContent(title);
            section.NewLine();
        }

        private void SetAggregates(IList<OrderDetailsAggregateModel> aggregation)
        {
            if(aggregation.Count == 0) {
                return;
            }

            var details = aggregation.OrderBy(d => d.ItemId);

            foreach(var detail in details)
            {
                SetAggregate(detail);
            }
        }

        private void SetAggregate(OrderDetailsAggregateModel aggregation)
        {
            var name = aggregation.Name;
            var dotsLength = 30 - aggregation.Name.Length;
            var dots = string.Empty.PadLeft(dotsLength > 0 ? dotsLength : 0, '.');
            var dotsSection = _document.LastPage.CreateSection();
            var section = _document.LastPage.CreateSection();

            section.SetSize(16);
            section.CreateLabel().SetContent(name);
            section.CreateLabel().SetContent($"{dots}");
            section.CreateLabel().SetContent($"{aggregation.Quantity.ToString().PadLeft(2, ' ')}");
            section.NewLine();
        }

        private void BlankFeed(int size)
        {
            var section = _document.LastPage.CreateSection();
            section.SetSize(size);
            section.NewLine();
            section.NewLine();
            section.NewLine();
            section.NewLine();
            section.NewLine();
        }

        public IDocument Build()
        {
            return _document;
        }
    }
}