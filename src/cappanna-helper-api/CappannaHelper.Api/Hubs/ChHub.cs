using CappannaHelper.Api.Identity.DataModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace CappannaHelper.Api.Hubs
{
    [Authorize]
    public class ChHub : Hub
    {
        public const string NOTIFY_ORDER_CREATED = "NotifyOrderCreated";
        public const string NOTIFY_ORDER_CHANGED = "NotifyOrderChanged";
        public const string NOTIFY_ORDER_PRINTED = "NotifyOrderPrinted";
        public const string NOTIFY_ORDER_DELETED = "NotifyOrderDeleted";
        public const string NOTIFY_ORDER_CLOSED = "NotifyOrderClosed";

        public const string NOTIFY_MENU_DETAILS_CHANGED = "NotifyMenuDetailsChanged";

        public const string NOTIFY_PRINTER_FAILURE = "NotifyPrinterFailure";

        public override async Task OnConnectedAsync()
        {
            var roles = Context.User.FindAll(ClaimTypes.Role);

            if (roles.Any(r => ApplicationRole.APPLICATION_ROLE_ADMIN.Equals(r.Value, StringComparison.OrdinalIgnoreCase)))
            {
                await Groups.AddToGroupAsync(Context.ConnectionId, ApplicationRole.APPLICATION_ROLE_ADMIN);
            }

            if (roles.Any(r => ApplicationRole.APPLICATION_ROLE_CASHIER.Equals(r.Value, StringComparison.OrdinalIgnoreCase)))
            {
                await Groups.AddToGroupAsync(Context.ConnectionId, ApplicationRole.APPLICATION_ROLE_CASHIER);
            }

            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            var roles = Context.User.FindAll(ClaimTypes.Role);

            if (roles.Any(r => ApplicationRole.APPLICATION_ROLE_ADMIN.Equals(r.Value, StringComparison.OrdinalIgnoreCase)))
            {
                await Groups.RemoveFromGroupAsync(Context.ConnectionId, ApplicationRole.APPLICATION_ROLE_ADMIN);
            }

            if (roles.Any(r => ApplicationRole.APPLICATION_ROLE_CASHIER.Equals(r.Value, StringComparison.OrdinalIgnoreCase)))
            {
                await Groups.RemoveFromGroupAsync(Context.ConnectionId, ApplicationRole.APPLICATION_ROLE_CASHIER);
            }

            await base.OnDisconnectedAsync(exception);
        }
    }
}
