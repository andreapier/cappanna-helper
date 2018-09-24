using System;
using System.Threading.Tasks;
using CappannaHelper.Printing;

namespace CappannaHelper.Api.Printing
{
    public interface IPrintService : IDisposable
    {
        Task PrintAsync<T>(T data);
        Task<IStatus> GetStatusAsync();
    }
}
