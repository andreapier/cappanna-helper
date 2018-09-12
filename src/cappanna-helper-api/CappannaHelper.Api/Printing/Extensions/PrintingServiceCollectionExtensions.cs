using CappannaHelper.Printing;
using CappannaHelper.Printing.Communication;
using CappannaHelper.Printing.Communication.Usb.Windows;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;

namespace CappannaHelper.Api.Printing.Extensions
{
    public static class PrintingServiceCollectionExtensions
    {
        public static IServiceCollection AddPrinting(this IServiceCollection services)
        {
            return services
                .AddSingleton<IPrinterDocumentBuilderFactory, PrinterDocumentBuilderFactory>()
                .AddSingleton<IPrinterResolver>(c => {
                    var printerOptions = c.GetService<IOptions<PrintingConfiguration>>();

                    return new RegistryPrinterResolver(printerOptions.Value.PrinterName);
                })
                .AddSingleton<UsbChannel>()
                .AddSingleton<FileChannel>()
                .AddSingleton<IChannel>(c =>
                {
                    var printerOptions = c.GetService<IOptions<PrintingConfiguration>>();

                    if (printerOptions.Value.ChannelType == "File")
                    {
                        return c.GetService<FileChannel>();
                    }
                
                    return c.GetService<UsbChannel>();
                })
                .AddSingleton<IPrinter, Printer>()
                .AddSingleton<IPrintService, PrintService>();
        }
    }
}