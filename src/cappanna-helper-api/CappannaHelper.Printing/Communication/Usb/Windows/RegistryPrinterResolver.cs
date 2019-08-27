using Microsoft.Win32;
using System;

namespace CappannaHelper.Printing.Communication.Usb.Windows
{
    public class RegistryPrinterResolver : IPrinterResolver
    {
        private readonly string _printerName;

        public RegistryPrinterResolver(string printerName)
        {
            if (string.IsNullOrEmpty(printerName))
            {
                throw new ArgumentException(nameof(printerName));
            }

            _printerName = printerName;
        }

        //TODO: Do not hardcode string resources
        public string ResolvePath()
        {
            var registryKey = $@"SOFTWARE\Microsoft\Windows NT\CurrentVersion\Print\Printers\{_printerName}";
            var key = Registry.LocalMachine.OpenSubKey(registryKey);

            if (key == null)
            {
                throw new CommunicationException($"Registry key '{registryKey}' was not found");
            }

            var value = (string)key.GetValue("Port");

            if (!value.StartsWith("USB"))
            {
                throw new CommunicationException($"Registry key '{registryKey}' has an invalid value");
            }

            int.TryParse(value.Replace("USB", string.Empty), out int printerPortNumber);

            registryKey = @"SYSTEM\CurrentControlSet\Control\DeviceClasses\{28d78fad-5a12-11d1-ae5b-0000f803a8c2}";
            key = Registry.LocalMachine.OpenSubKey(registryKey);

            if (key == null)
            {
                throw new CommunicationException($"Registry key '{registryKey}' was not found");
            }

            var devicePath = string.Empty;
            var subKeysName = key.GetSubKeyNames();

            foreach (var item in subKeysName)
            {
                var localRegistryKey = $@"{registryKey}\{item}";
                var subKey = Registry.LocalMachine.OpenSubKey(localRegistryKey);

                if (subKey == null)
                {
                    continue;
                }

                var subsubKey = Registry.LocalMachine.OpenSubKey($@"{localRegistryKey}\#\Device Parameters");

                if (subsubKey == null)
                {
                    continue;
                }

                var baseName = (string)subsubKey.GetValue("Base Name");
                int portNumber;

                try
                {
                    portNumber = (int)subsubKey.GetValue("Port Number");
                }
                catch
                {
                    continue;
                }

                if (baseName == "USB" && portNumber == printerPortNumber)
                {
                    devicePath = item.Replace(@"##?#USB", @"\\?\usb");
                    break;
                }
            }

            return devicePath;
        }
    }
}
