using CappannaHelper.Api.Persistence.Modelling;
using CappannaHelper.Printing;

namespace CappannaHelper.Api.Printing
{
    public interface IPrinterDocumentBuilder
    {
        IDocument Build();
        IPrinterDocumentBuilder SetOrder(ChOrder order);
    }
}