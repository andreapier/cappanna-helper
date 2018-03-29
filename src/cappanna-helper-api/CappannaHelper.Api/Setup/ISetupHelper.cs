using System.Collections.Generic;
using System.Threading.Tasks;

namespace CappannaHelper.Api.Setup
{
    public interface ISetupHelper
    {
        Task<IList<string>> SetupAsync();
    }
}
