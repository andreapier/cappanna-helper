using CappannaHelper.Printing;

namespace CappannaHelper.Api.Printing {
    public interface IPrinterDocumentBuilder<T>
    {
        IDocument Build();
        IPrinterDocumentBuilder<T> SetData(T order);
    }
}