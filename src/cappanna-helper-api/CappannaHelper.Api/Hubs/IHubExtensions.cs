using CappannaHelper.Api.Identity.DataModel;
using CappannaHelper.Api.Persistence.Modelling;
using Microsoft.AspNetCore.SignalR;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace CappannaHelper.Api.Hubs
{
    public static class IHubExtensions
    {
        public static async Task NotifyOrderChangedAsync(this IHubContext<ChHub> hub, string method, ChOrder order, CancellationToken cancellationToken = default)
        {
            var users = order.Operations.Select(o => o.UserId).Distinct().ToList();
            foreach (var user in users)
            {
                await hub.Clients.User(user.ToString()).SendAsync(method, order, cancellationToken);
            }

            await hub.Clients.Group(ApplicationRole.APPLICATION_ROLE_ADMIN).SendAsync(method, order, cancellationToken);
            await hub.Clients.Group(ApplicationRole.APPLICATION_ROLE_CASHIER).SendAsync(method, order, cancellationToken);
        }

        public static async Task NotifyMenuChangedAsync(this IHubContext<ChHub> hub, List<MenuDetail> order, CancellationToken cancellationToken = default)
        {
            await hub.Clients.All.SendAsync(ChHub.NOTIFY_MENU_DETAILS_CHANGED, order, cancellationToken);
        }
    }
}
