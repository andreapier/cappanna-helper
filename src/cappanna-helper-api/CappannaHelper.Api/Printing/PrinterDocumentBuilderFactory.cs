using CappannaHelper.Api.Models;
using CappannaHelper.Api.Persistence.Modelling;
using System;
using System.Collections.Generic;

namespace CappannaHelper.Api.Printing
{
    public class PrinterDocumentBuilderFactory : IPrinterDocumentBuilderFactory
    {
        public IPrinterDocumentBuilder<T> Create<T>()
        {
            if (typeof(T) == typeof(ChOrder))
            {
                return (IPrinterDocumentBuilder<T>) CreateChOrderDocumentBuilder();
            }

            if(typeof(T) == typeof(List<OrderDetailsAggregateModel>))
            {
                return (IPrinterDocumentBuilder<T>) CreateOrderAggregateDocumentBuilder();
            }

            throw new NotImplementedException($"Document type not implemented: {typeof(T)}");
        }

        private static OrderDocumentBuilder CreateChOrderDocumentBuilder()
        {
            return new OrderDocumentBuilder();
        }

        private static OrderDetailsAggregateDocumentBuilder CreateOrderAggregateDocumentBuilder()
        {
            return new OrderDetailsAggregateDocumentBuilder();
        }
    }
}