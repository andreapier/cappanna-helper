using CappannaHelper.Api.Printing;

public interface IPrinterDocumentBuilderFactory
{
    IPrinterDocumentBuilder<T> Create<T>();
}