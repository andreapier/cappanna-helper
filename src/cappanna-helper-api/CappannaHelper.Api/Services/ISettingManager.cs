using System.Threading.Tasks;

namespace CappannaHelper.Api.Services
{
    public interface ISettingManager
    {
        Task<T> GetSettingValue<T>(string name);
    }
}
