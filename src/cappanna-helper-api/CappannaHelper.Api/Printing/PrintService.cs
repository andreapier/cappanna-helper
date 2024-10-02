using CappannaHelper.Printing;
using System.Threading;
using System.Threading.Tasks;

namespace CappannaHelper.Api.Printing
{
    public sealed class PrintService : IPrintService
    {
        private readonly IPrinterDocumentBuilderFactory _factory;
        private readonly IPrinter _printer;
        private readonly SemaphoreSlim _semaphore;

        public PrintService(IPrinterDocumentBuilderFactory factory, IPrinter printer)
        {
            _factory = factory;
            _printer = printer;
            _semaphore = new SemaphoreSlim(1, 1);
        }

        public async Task PrintAsync<T>(T data)
        {
            var builder = _factory.Create<T>();
            var document = builder.SetData(data).Build();

            await _semaphore.WaitAsync();

            try
            {
                await _printer.PrintAsync(document);
            }
            finally
            {
                _semaphore.Release();
            }
        }

        public void Dispose()
        {
            _semaphore.Dispose();
        }
    }
}
