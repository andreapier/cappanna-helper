using System;
using CappannaHelper.Printing.EscPos.Vendors;

namespace CappannaHelper.Printing.EscPos
{
    public class StatusFactory : IStatusFactory
    {
        private readonly string _printerName;

        public StatusFactory(string printerName)
        {
            _printerName = printerName;
        }

        public IStatus Create()
        {
            if (string.Equals(_printerName, "POS-80", StringComparison.InvariantCultureIgnoreCase))
            {
                return new SicarPos80Status();
            }

            return new Status();
        }
    }
}
