using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using CappannaHelper.Api.Models;
using CappannaHelper.Api.Persistence.Modelling;

namespace CappannaHelper.Api.Printing
{
    public class PrinterDocumentBuilderFactory : IPrinterDocumentBuilderFactory
    {
        public IPrinterDocumentBuilder<T> Create<T>()
        {
            if (typeof(T) == typeof(ChOrder)) {
                return (IPrinterDocumentBuilder<T>) CreateChOrderDocumentBuilder<ChOrder>();
            }
            if(typeof(T) == typeof(IList<OrderDetailsAggregateModel>)) {
                return (IPrinterDocumentBuilder<T>) CreateOrderAggregateDocumentBuilder<IList<OrderDetailsAggregateModel>>();
            }

            throw new NotImplementedException($"Document type not implemented: {typeof(T)}");
        }

        private OrderDocumentBuilder CreateChOrderDocumentBuilder<T>() {
            return new OrderDocumentBuilder();
        }

        private OrderDetailsAggregateDocumentBuilder CreateOrderAggregateDocumentBuilder<T>() {
            return new OrderDetailsAggregateDocumentBuilder();
        }
    }
}