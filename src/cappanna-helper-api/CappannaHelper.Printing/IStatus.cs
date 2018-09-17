using System.Collections.Generic;
using System.Threading.Tasks;
using CappannaHelper.Printing.Communication;

namespace CappannaHelper.Printing
{
    public interface IStatus
    {
        bool HasError { get; }
        bool IsOk { get; }
        IDictionary<string, bool> Details { get; }

        Task<bool> ExecuteAsync(IChannel channel);
    }
}
