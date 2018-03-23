using CappannaHelper.Api.Persistence.Modelling;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace CappannaHelper.Api.Hubs
{
    [Authorize]
    public class MenuHub : Hub
    {
        public async Task NotifyLimitedStock(MenuDetail detail, int units)
        {
            await Clients.All.SendAsync("NotifyLimitedStock", detail, units);
        }

        public async Task NotifyOutOfStock(MenuDetail detail)
        {
            await Clients.All.SendAsync("NotifyOutOfStock", detail);
        }

        public async Task NotifyAvailability(MenuDetail detail)
        {
            await Clients.All.SendAsync("NotifyAvailability", detail);
        }
    }
}
