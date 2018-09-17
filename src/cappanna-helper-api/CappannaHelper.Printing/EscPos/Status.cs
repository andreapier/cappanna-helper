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

        public async Task<bool> ExecuteAsync(IChannel channel)
        {
            await ExecuteTransmitPrinterStatusAsync(channel);
            await ExecuteTransmitOfflineCauseAsync(channel);
            await ExecuteErrorCauseAsync(channel);
            await ExecuteRollPaperSensorStatusAsync(channel);
            await ExecuteInkAStatusAsync(channel);
            await ExecuteInkBStatusAsync(channel);
            await ExecutePeelerStatusCauseAsync(channel);

            return IsOk;
        }

        private async Task ExecuteTransmitPrinterStatusAsync(IChannel channel) {
            var ok = await channel.WriteAsync(Commands.TRANSMIT_PRINTER_STATUS.ToArray());

            if(!ok) {
                throw new Exception("Cannot send 'TRANSMIT_PRINTER_STATUS' command to printer");
            }

            var data = await channel.ReadAsync(1);

            Details["IsOffline"] = (data[0] & 0x08) == 1;
            Details["IsWaitingForOnlineRecovery"] = (data[0] & 0x05) == 1;
            Details["IsFeedButtonPressed"] = (data[0] & 0x07) == 1;
        }

        private async Task ExecuteTransmitOfflineCauseAsync(IChannel channel) {
            var ok = await channel.WriteAsync(Commands.TRANSMIT_OFFLINE_CAUSE_STATUS.ToArray());

            if(!ok) {
                throw new Exception("Cannot send 'TRANSMIT_OFFLINE_CAUSE_STATUS' command to printer");
            }

            var data = await channel.ReadAsync(1);

            Details["IsCoverOpen"] = (data[0] & 0x02) == 1;
            Details["IsForcedFeed"] = (data[0] & 0x03) == 1;
            Details["IsPaperEnd"] = (data[0] & 0x05) == 1;
            Details["ErrorOccurred"] = (data[0] & 0x06) == 1;
        }

        private async Task ExecuteErrorCauseAsync(IChannel channel) {
            var ok = await channel.WriteAsync(Commands.TRANSMIT_ERROR_CAUSE_STATUS.ToArray());

            if(!ok) {
                throw new Exception("Cannot send 'TRANSMIT_ERROR_CAUSE_STATUS' command to printer");
            }

            var data = await channel.ReadAsync(1);

            Details["RecoverableErrorOccurred"] = (data[0] & 0x02) == 1;
            Details["AutocutterErrorOccurred"] = (data[0] & 0x03) == 1;
            Details["UnrecoverableErrorOccurred"] = (data[0] & 0x05) == 1;
            Details["AutorecoverableErrorOccurred"] = (data[0] & 0x06) == 1;
        }

        private async Task ExecuteRollPaperSensorStatusAsync(IChannel channel) {
            var ok = await channel.WriteAsync(Commands.TRANSMIT_ROLL_PAPER_SENSOR_STATUS.ToArray());

            if(!ok) {
                throw new Exception("Cannot send 'TRANSMIT_ROLL_PAPER_SENSOR_STATUS' command to printer");
            }

            var data = await channel.ReadAsync(1);

            Details["IsPaperNearEnd"] = (data[0] & 0x02) == 1;
            Details["IsPaperEnd"] = (data[0] & 0x05) == 1;
        }

        private async Task ExecuteInkAStatusAsync(IChannel channel) {
            var ok = await channel.WriteAsync(Commands.TRANSMIT_INK_A_STATUS.ToArray());

            if(!ok) {
                throw new Exception("Cannot send 'TRANSMIT_INK_A_STATUS' command to printer");
            }

            var data = await channel.ReadAsync(1);

            Details["InkANearEnd"] = (data[0] & 0x02) == 1;
            Details["InkAEnd"] = (data[0] & 0x03) == 1;
            Details["InkACartridgeMissing"] = (data[0] & 0x05) == 1;
        }

        private async Task ExecuteInkBStatusAsync(IChannel channel) {
            var ok = await channel.WriteAsync(Commands.TRANSMIT_INK_B_STATUS.ToArray());

            if(!ok) {
                throw new Exception("Cannot send 'TRANSMIT_INK_B_STATUS' command to printer");
            }

            var data = await channel.ReadAsync(1);

            Details["InkBNearEnd"] = (data[0] & 0x02) == 1;
            Details["InkBEnd"] = (data[0] & 0x03) == 1;
            Details["InkBCartridgeMissing"] = (data[0] & 0x05) == 1;
        }

        private async Task ExecutePeelerStatusCauseAsync(IChannel channel) {
            var ok = await channel.WriteAsync(Commands.TRANSMIT_PEELER_STATUS.ToArray());

            if(!ok) {
                throw new Exception("Cannot send 'TRANSMIT_PEELER_STATUS' command to printer");
            }

            var data = await channel.ReadAsync(1);

            Details["IsWaitingForLabelRemoval"] = (data[0] & 0x02) == 1;
            Details["PaperMissingFromPeeler"] = (data[0] & 0x05) == 1;
        }
    }
}
