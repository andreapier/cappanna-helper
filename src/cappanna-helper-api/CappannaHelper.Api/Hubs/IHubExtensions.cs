using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using CappannaHelper.Api.Persistence.Modelling;
using Microsoft.AspNetCore.SignalR;

namespace CappannaHelper.Api.Hubs
{
    public static class IHubExtensions
    {
        public static async Task NotifyOrderChangedAsync(this IHubContext<ChHub> hub, string method, ChOrder order, CancellationToken cancellationToken = default)
        {
            await hub.Clients.All.SendAsync(method, order, cancellationToken);
        }

        public static async Task NotifyMenuChangedAsync(this IHubContext<ChHub> hub, List<MenuDetail> order, CancellationToken cancellationToken = default)
        {
            await hub.Clients.All.SendAsync(ChHub.NOTIFY_MENU_DETAILS_CHANGED, order, cancellationToken);
        }
    }
}
