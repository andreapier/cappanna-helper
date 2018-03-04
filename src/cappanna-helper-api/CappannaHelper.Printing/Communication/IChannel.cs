using System;
using System.Threading.Tasks;

namespace CappannaHelper.Printing.Communication
{
    public interface IChannel : IDisposable
    {
        Task<bool> OpenAsync();
        Task<byte[]> ReadAsync(int length);
        Task<bool> WriteAsync(byte[] command);
        Task CloseAsync();
    }
}
