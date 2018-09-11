using System.Collections.Generic;
using CappannaHelper.Api.Models;
using CappannaHelper.Printing;
using CappannaHelper.Printing.EscPos;

namespace CappannaHelper.Api.Printing
{
    public class OrderDetailsAggregateDocumentBuilder: IPrinterDocumentBuilder<IList<OrderDetailsAggregateModel>>
    {
        private readonly Document _document;

        public OrderDetailsAggregateDocumentBuilder()
        {
            _document = new Document();
        }

        public IPrinterDocumentBuilder<IList<OrderDetailsAggregateModel>> SetData(IList<OrderDetailsAggregateModel> aggregation)
        {
            return this;
        }

        public IDocument Build()
        {
            return _document;
        }
    }
}