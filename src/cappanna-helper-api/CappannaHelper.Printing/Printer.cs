using CappannaHelper.Printing.Communication;
using System;
using System.Threading.Tasks;

namespace CappannaHelper.Printing
{
    public class Printer : IPrinter
    {
        private readonly IChannel _channel;
        private readonly IStatusFactory _statusFactory;

        public Printer(IChannel channel, IStatusFactory statusFactory)
        {
            _channel = channel ?? throw new ArgumentNullException(nameof(channel));
            _statusFactory = statusFactory ?? throw new ArgumentNullException(nameof(statusFactory));
        }

        public async Task PrintAsync(IDocument document)
        {
            if (document == null)
            {
                throw new ArgumentNullException(nameof(document));
            }

            using(_channel)
            {
                await _channel.OpenAsync();
                var documentContent = document.Render();
                await _channel.WriteAsync(documentContent);
            }
        }

        public async Task<IStatus> GetStatusAsync()
        {
            using(_channel)
            {
                await _channel.OpenAsync();
                var status = _statusFactory.Create();
                await status.ExecuteAsync(_channel);

                return status;
            }
        }
    }
}
