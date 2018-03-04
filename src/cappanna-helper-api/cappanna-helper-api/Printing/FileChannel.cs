using CappannaHelper.Printing.Communication;
using System.IO;
using System.Threading.Tasks;

namespace CappannaHelper.Api.Printing
{
    public class FileChannel : IChannel
    {
        private FileStream _file;

        public bool Open()
        {
            try
            {
                _file = File.Create("RawPrint.txt");
                return true;
            }
            catch
            {
                return false;
            }
        }

        public byte[] Read(int length)
        {
            return null;
        }

        public bool Write(byte[] command)
        {
            _file.Write(command, 0, command.Length);
            return true;
        }

        public void Close()
        {
            _file.Flush();
            _file.Dispose();
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
            await _file.WriteAsync(command, 0, command.Length);
            return true;
        }

        public async Task CloseAsync()
        {
            await Task.Factory.StartNew(() => Close());
        }
    }
}
