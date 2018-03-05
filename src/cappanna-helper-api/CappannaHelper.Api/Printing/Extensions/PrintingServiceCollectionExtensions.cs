using CappannaHelper.Printing;
using CappannaHelper.Printing.Communication;
using CappannaHelper.Printing.Communication.Windows;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;

namespace CappannaHelper.Api.Printing.Extensions
{
    public static class PrintingServiceCollectionExtensions
    {
        public static void AddPrinting(this IServiceCollection services)
        {
            services.AddSingleton<IPrinterDocumentBuilderFactory, PrinterDocumentBuilderFactory>();
            services.AddSingleton<IPrinterResolver>(c => {
                var printerOptions = c.GetService<IOptions<PrintingConfiguration>>();

                return new RegistryPrinterResolver(printerOptions.Value.PrinterName);
            });
            services.AddSingleton<UsbChannel>();
            services.AddSingleton<FileChannel>();
            services.AddSingleton<IChannel>(c =>
            {
                var printerOptions = c.GetService<IOptions<PrintingConfiguration>>();

                if (printerOptions.Value.ChannelType == "File")
                {
                    return c.GetService<FileChannel>();
                }
                
                return c.GetService<UsbChannel>();
            });
            services.AddSingleton<IPrinter, Printer>();
            services.AddSingleton<IPrintService, PrintService>();
        }
    }
}