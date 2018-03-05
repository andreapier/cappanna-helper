using System;
using System.Threading.Tasks;
using CappannaHelper.Api.Persistence.Modelling;

namespace CappannaHelper.Api.Printing
{
    public class PrinterDocumentBuilderFactory : IPrinterDocumentBuilderFactory
    {
        public IPrinterDocumentBuilder Create()
        {
            return new PrinterDocumentBuilder();
        }
    }
}