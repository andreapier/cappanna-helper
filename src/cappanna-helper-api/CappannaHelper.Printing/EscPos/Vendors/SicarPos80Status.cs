using System.Threading.Tasks;
using CappannaHelper.Printing.Communication;

namespace CappannaHelper.Printing.EscPos.Vendors
{
    public class SicarPos80Status : Status
    {
        public override async Task<bool> ExecuteAsync(IChannel channel)
        {
            await ExecuteTransmitOfflineStatusAsync(channel);
            await ExecuteErrorStatusAsync(channel);
            await ExecuteRollPaperSensorStatusAsync(channel);

            return IsOk;
        }

        protected override async Task ExecuteErrorStatusAsync(IChannel channel)
        {
            var data = await SendReceiveCommandAsync(channel, nameof(Commands.TRANSMIT_ERROR_STATUS), Commands.TRANSMIT_ERROR_STATUS, 1);

            Details["AutocutterErrorOccurred"] = (data[0] & 0x03) == 1;
            Details["UnrecoverableErrorOccurred"] = (data[0] & 0x05) == 1;
            Details["AutorecoverableErrorOccurred"] = (data[0] & 0x06) == 1;
        }
    }
}
