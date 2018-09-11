using System;
using System.Threading.Tasks;

namespace CappannaHelper.Api.Printing {
    public interface IPrintService : IDisposable
    {
        Task PrintAsync<T>(T data);
    }
}
