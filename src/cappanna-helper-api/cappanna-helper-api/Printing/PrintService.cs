using CappannaHelper.Api.Persistence.Modelling;
using CappannaHelper.Printing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace CappannaHelper.Api.Printing
{
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

        public async Task PrintAsync(ChOrder order)
        {
            if (order == null)
            {
                throw new ArgumentNullException(nameof(order));
            }

            var builder = _factory.Create();
            var document = builder.SetOrder(order).Build();

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
