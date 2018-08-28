using CappannaHelper.Api.Identity.DataModel;
using CappannaHelper.Api.Persistence.Modelling;
using System.Threading.Tasks;

namespace CappannaHelper.Api.Services
{
    public interface IShiftManager
    {
        Task<Shift> GetOrCreateCurrentAsync();
    }
}
