using System;
using System.Collections.Generic;
using System.Threading;
using System.Runtime.InteropServices;
using System.Threading.Tasks;

namespace CappannaHelper.Printing.Communication.Usb.Windows
{
    public class UsbChannel : IChannel
    {
        [DllImport("kernel32.dll", SetLastError = true)]
        private static extern IntPtr CreateFile(
            string lpFileName, uint dwDesiredAccess, uint dwShareMode, IntPtr lpSecurityAttributes,
            uint dwCreationDisposition, uint dwFlagsAndAttributes, IntPtr hTemplateFile);

        [DllImport("kernel32.dll")]
        private static extern IntPtr CreateEvent(IntPtr lpEventAttributes, bool bManualReset, bool bInitialState, string lpName);

        [DllImport("kernel32.dll", SetLastError = true)]
        [return: MarshalAs(UnmanagedType.Bool)]
        private static extern bool CloseHandle(IntPtr hObject);

        [DllImport("kernel32.dll", CallingConvention = CallingConvention.Winapi, SetLastError = true)]
        private static extern bool WriteFile(IntPtr hFile, [In] byte[] lpBuffer, int nNumberOfBytesToWrite, out uint lpNumberOfBytesWritten, ref NativeOverlapped lpOverlapped);

        [DllImport("kernel32.dll", SetLastError = true)]
        private static extern int WaitForSingleObject(IntPtr hHandle, int dwMilliseconds);

        [DllImport("kernel32.dll")]
        [return: MarshalAs(UnmanagedType.Bool)]
        private static extern bool CancelIo(IntPtr hFile);

        [DllImport("kernel32.dll", CharSet = CharSet.Unicode, CallingConvention = CallingConvention.StdCall, SetLastError = true)]
        private static extern bool ReadFile(
            IntPtr hFile, [Out] IntPtr lpBuffer, int nNumberOfBytesToRead,
            out uint lpNumberOfBytesRead, ref NativeOverlapped lpOverlapped);

        [DllImport("kernel32.dll", SetLastError = true, CallingConvention = CallingConvention.Winapi)]
        private static extern int GetOverlappedResult(IntPtr hFile, ref NativeOverlapped lpOverlapped, ref uint lpNumberOfBytesTransferred, bool bWait);

        private IntPtr hUsbDev_read;
        private IntPtr hUsbDev_write;
        private IntPtr hEvent_write;
        private IntPtr hEvent_read;

        private const uint GENERIC_READ = 0x80000000;
        private const int FILE_SHARE_READ = 1;
        private const int OPEN_EXISTING = 3;
        private const int FILE_FLAG_OVERLAPPED = 1073741824;
        private const int GENERIC_WRITE = 0x40000000;
        private const int FILE_FLAG_NO_BUFFERING = 0x20000000;
        private const uint FILE_FLAG_WRITE_THROUGH = 0x80000000;
        private const int FILE_SHARE_WRITE = 2;
        private const int WAIT_SUCCESS = 0x00000000;
        private const int WAIT_TIMEOUT = 0x00000102;
        private const int WRITE_TIMEOUT = 5000;
        private const int READ_TIMEOUT = 5000;
        private const int USB_PACK = 4096;

        private bool _isOpen;

        private readonly IPrinterResolver _resolver;

        public UsbChannel(IPrinterResolver resolver)
        {
            _resolver = resolver ?? throw new ArgumentNullException("resolver");
        }

        public bool Open()
        {
            var path = _resolver.ResolvePath();
            hUsbDev_read = CreateFile($"{path}\\PIPE00\\",
                    GENERIC_READ, FILE_SHARE_READ, IntPtr.Zero,
                    OPEN_EXISTING, FILE_FLAG_OVERLAPPED, IntPtr.Zero);
            hUsbDev_write = CreateFile($"{path}\\PIPE01\\",
                    GENERIC_WRITE, FILE_SHARE_WRITE, IntPtr.Zero,
                    OPEN_EXISTING, FILE_FLAG_OVERLAPPED, IntPtr.Zero);
            hEvent_read = CreateEvent(IntPtr.Zero, false, false, "read_event");
            hEvent_write = CreateEvent(IntPtr.Zero, false, false, "write_event");

            if (hUsbDev_read != IntPtr.Zero && hUsbDev_write != IntPtr.Zero && hEvent_read != IntPtr.Zero && hEvent_write != IntPtr.Zero)
            {
                _isOpen = hUsbDev_read.ToInt32() != -1 && hUsbDev_write.ToInt32() != -1;
            }
            else
            {
                _isOpen = false;
            }

            return _isOpen;
        }

        public byte[] Read(int length)
        {
            if (!_isOpen)
            {
                throw new Exception("Channel is closed");
            }

            var fifoBuffer = new List<byte>();
            var bufferPointer = Marshal.AllocHGlobal(USB_PACK);
            var totalBytes = 0;
            uint bytesRead;
            var counter = 0;

            while (totalBytes < length && counter < 10)
            {
                counter++;
                var ovp = new NativeOverlapped
                {
                    OffsetLow = 0,
                    OffsetHigh = 0,
                    EventHandle = hEvent_read
                };
                ReadFile(hUsbDev_read, bufferPointer, USB_PACK, out bytesRead, ref ovp);
                var success = WaitForSingleObject(hEvent_read, READ_TIMEOUT);

                if (success == WAIT_SUCCESS)
                {
                    if (GetOverlappedResult(hUsbDev_read, ref ovp, ref bytesRead, false) > 0)
                    {
                        var bAppBuffer = new byte[bytesRead];
                        Marshal.Copy(bufferPointer, bAppBuffer, 0, (int)bytesRead);

                        for (var t = 0; t < bytesRead; t++)
                        {
                            fifoBuffer.AddRange(bAppBuffer);
                        }

                        totalBytes += (int)bytesRead;
                    }
                }
            }

            CancelIo(hUsbDev_read);
            fifoBuffer.Clear();
            Marshal.FreeHGlobal(bufferPointer);

            return fifoBuffer.ToArray();
        }

        public bool Write(byte[] command)
        {
            if (!_isOpen)
            {
                throw new Exception("Channel is closed");
            }

            uint recLen = 1;
            var ovp = new NativeOverlapped
            {
                OffsetLow = 0,
                OffsetHigh = 0,
                EventHandle = hEvent_write
            };

            WriteFile(hUsbDev_write, command, command.Length, out recLen, ref ovp);
            var success = WaitForSingleObject(hEvent_write, WRITE_TIMEOUT);
            CancelIo(hUsbDev_write);

            return success == WAIT_SUCCESS;
        }

        public void Close()
        {
            CloseHandle(hUsbDev_read);
            CloseHandle(hUsbDev_write);
            hUsbDev_read = IntPtr.Zero;
            hUsbDev_write = IntPtr.Zero;
            CloseHandle(hEvent_read);
            CloseHandle(hEvent_write);
            hEvent_read = IntPtr.Zero;
            hEvent_write = IntPtr.Zero;
            _isOpen = false;
        }

        public void Dispose()
        {
            Close();
        }

        public async Task<bool> OpenAsync()
        {
            return await Task.Factory.StartNew(() => Open());
        }

        public async Task<byte[]> ReadAsync(int length)
        {
            return await Task.Factory.StartNew(() => Read(length));
        }

        public async Task<bool> WriteAsync(byte[] command)
        {
            return await Task.Factory.StartNew(() => Write(command));
        }

        public async Task CloseAsync()
        {
            await Task.Factory.StartNew(() => Close());
        }
    }
}
