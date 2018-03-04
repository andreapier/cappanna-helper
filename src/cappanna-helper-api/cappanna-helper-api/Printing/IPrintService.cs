using CappannaHelper.Api.Persistence.Modelling;
using System;
using System.Threading.Tasks;

namespace CappannaHelper.Api.Printing
{
    public interface IPrintService : IDisposable
    {
        Task PrintAsync(ChOrder order);
    }
}
