using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CappannaHelper.Printing.Communication;

namespace CappannaHelper.Printing.EscPos
{
    public class Status : IStatus
    {
        public bool HasError => Details.Values.Any(v => v);

        public bool IsOk => !HasError;

        public IDictionary<string, bool> Details { get; }

        public Status()
        {
            Details = new Dictionary<string, bool>();
        }

        public virtual async Task<bool> ExecuteAsync(IChannel channel)
        {
            await ExecuteTransmitPrinterStatusAsync(channel);
            await ExecuteTransmitOfflineStatusAsync(channel);
            await ExecuteErrorStatusAsync(channel);
            await ExecuteRollPaperSensorStatusAsync(channel);
            await ExecuteInkAStatusAsync(channel);
            await ExecuteInkBStatusAsync(channel);
            await ExecutePeelerStatusAsync(channel);

            return IsOk;
        }

        protected virtual async Task ExecuteTransmitPrinterStatusAsync(IChannel channel)
        {
            var data = await SendReceiveCommandAsync(channel, nameof(Commands.TRANSMIT_PRINTER_STATUS), Commands.TRANSMIT_PRINTER_STATUS, 1);

            Details["IsOffline"] = (data[0] & 0x08) == 1;
            Details["IsWaitingForOnlineRecovery"] = (data[0] & 0x05) == 1;
            Details["IsFeedButtonPressed"] = (data[0] & 0x07) == 1;
        }

        protected virtual async Task ExecuteTransmitOfflineStatusAsync(IChannel channel)
        {
            var data = await SendReceiveCommandAsync(channel, nameof(Commands.TRANSMIT_OFFLINE_STATUS), Commands.TRANSMIT_OFFLINE_STATUS, 1);

            Details["IsCoverOpen"] = (data[0] & 0x02) == 1;
            Details["IsForcedFeed"] = (data[0] & 0x03) == 1;
            Details["IsPaperEnd"] = (data[0] & 0x05) == 1;
            Details["ErrorOccurred"] = (data[0] & 0x06) == 1;
        }

        protected virtual async Task ExecuteErrorStatusAsync(IChannel channel)
        {
            var data = await SendReceiveCommandAsync(channel, nameof(Commands.TRANSMIT_ERROR_STATUS), Commands.TRANSMIT_ERROR_STATUS, 1);
            
            Details["RecoverableErrorOccurred"] = (data[0] & 0x02) == 1;
            Details["AutocutterErrorOccurred"] = (data[0] & 0x03) == 1;
            Details["UnrecoverableErrorOccurred"] = (data[0] & 0x05) == 1;
            Details["AutorecoverableErrorOccurred"] = (data[0] & 0x06) == 1;
        }

        protected virtual async Task ExecuteRollPaperSensorStatusAsync(IChannel channel)
        {
            var data = await SendReceiveCommandAsync(channel, nameof(Commands.TRANSMIT_ROLL_PAPER_SENSOR_STATUS), Commands.TRANSMIT_ROLL_PAPER_SENSOR_STATUS, 1);

            Details["IsPaperNearEnd"] = (data[0] & 0x02) == 1;
            Details["IsPaperEnd"] = (data[0] & 0x05) == 1;
        }

        protected virtual async Task ExecuteInkAStatusAsync(IChannel channel)
        {
            var data = await SendReceiveCommandAsync(channel, nameof(Commands.TRANSMIT_INK_A_STATUS), Commands.TRANSMIT_INK_A_STATUS, 1);

            Details["InkANearEnd"] = (data[0] & 0x02) == 1;
            Details["InkAEnd"] = (data[0] & 0x03) == 1;
            Details["InkACartridgeMissing"] = (data[0] & 0x05) == 1;
        }

        protected virtual async Task ExecuteInkBStatusAsync(IChannel channel)
        {
            var data = await SendReceiveCommandAsync(channel, nameof(Commands.TRANSMIT_INK_B_STATUS), Commands.TRANSMIT_INK_B_STATUS, 1);

            Details["InkBNearEnd"] = (data[0] & 0x02) == 1;
            Details["InkBEnd"] = (data[0] & 0x03) == 1;
            Details["InkBCartridgeMissing"] = (data[0] & 0x05) == 1;
        }

        protected virtual async Task ExecutePeelerStatusAsync(IChannel channel)
        {
            var data = await SendReceiveCommandAsync(channel, nameof(Commands.TRANSMIT_PEELER_STATUS), Commands.TRANSMIT_PEELER_STATUS, 1);

            Details["IsWaitingForLabelRemoval"] = (data[0] & 0x02) == 1;
            Details["PaperMissingFromPeeler"] = (data[0] & 0x05) == 1;
        }

        protected async Task<byte[]> SendReceiveCommandAsync(IChannel channel, string commandName, IEnumerable<byte> command, int responseLength)
        {
            var ok = await channel.WriteAsync(command.ToArray());

            if(!ok)
            {
                throw new Exception($"Cannot send '{commandName}' command to printer");
            }

            return await channel.ReadAsync(responseLength);
        }
    }
}
