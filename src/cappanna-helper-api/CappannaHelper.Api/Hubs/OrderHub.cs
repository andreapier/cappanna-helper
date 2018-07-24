using Microsoft.AspNetCore.SignalR;

namespace CappannaHelper.Api.Hubs
{
    public class OrderHub : Hub
    {
        public const string NOTIFY_ORDER_CREATED = "NotifyOrderCreated";
    }
}
