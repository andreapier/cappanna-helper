using CappannaHelper.Printing.Communication;
using System.IO;
using System.Threading.Tasks;

namespace CappannaHelper.Printing
{
    public class FileChannel : IChannel
    {
        private FileStream _file;

        public void Dispose()
        {
            CloseAsync().Wait();
            _file.Dispose();
        }

        public async Task<bool> OpenAsync()
        {
            try
            {
                _file = File.Create("RawPrint.txt");
                return await Task.FromResult(true);
            }
            catch {
                return await Task.FromResult(false);
            }
        }

        public async Task<byte[]> ReadAsync(int length)
        {
            return await Task.FromResult(new byte[length]);
        }

        public async Task<bool> WriteAsync(byte[] command)
        {
            await _file.WriteAsync(command, 0, command.Length);
            return true;
        }

        public async Task CloseAsync()
        {
            await _file.FlushAsync();
        }
    }
}
