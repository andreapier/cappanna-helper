using System;
using System.Net;
using System.Net.Sockets;
using System.Threading.Tasks;

namespace CappannaHelper.Printing.Communication.Lan
{
    public class TcpChannel : IChannel
    {
        private readonly IPAddress _host;
        private readonly int _port;
        private readonly TcpClient _client;

        public TcpChannel(IPAddress host, int port)
        {
            if (port <= 0) {
                throw new ArgumentException(nameof(port));
            }

            _host = host ?? throw new ArgumentNullException(nameof(host));
            _port = port;
            _client = new TcpClient();
        }

        public async Task CloseAsync()
        {
            await Task.FromResult(0);
        }

        public void Dispose()
        {
            _client.Dispose();
        }

        public async Task<bool> OpenAsync()
        {
            await _client.ConnectAsync(_host, _port);

            return true;
        }

        public async Task<byte[]> ReadAsync(int length) {
            var stream = _client.GetStream();
            var result = new byte[length];
            var bytesRead = await stream.ReadAsync(result);

            return result;
        }

        public async Task<bool> WriteAsync(byte[] command)
        {
            var stream = _client.GetStream();
            await stream.WriteAsync(command);

            return true;
        }
    }
}
