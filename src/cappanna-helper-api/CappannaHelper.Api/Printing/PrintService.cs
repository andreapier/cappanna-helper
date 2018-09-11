using System;
using System.Threading;
using System.Threading.Tasks;
using CappannaHelper.Printing;

namespace CappannaHelper.Api.Printing {
    public class PrintService : IPrintService
    {
        private readonly IPrinterDocumentBuilderFactory _factory;
        private readonly IPrinter _printer;
        private readonly SemaphoreSlim _semaphore;

        public PrintService(IPrinterDocumentBuilderFactory factory, IPrinter printer)
        {
            _factory = factory ?? throw new ArgumentNullException(nameof(factory));
            _printer = printer ?? throw new ArgumentNullException(nameof(printer));
            _semaphore = new SemaphoreSlim(1, 1);
        }

        public async Task PrintAsync<T>(T data)
        {
            if (data == null)
            {
                throw new ArgumentNullException(nameof(data));
            }

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
