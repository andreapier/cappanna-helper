using Microsoft.AspNetCore.SignalR;

namespace CappannaHelper.Api.Hubs
{
    public class OrderHub : Hub
    {
        public const string NOTIFY_ORDER_CREATED = "NotifyOrderCreated";
        public const string NOTIFY_ORDER_CHANGED = "NotifyOrderChanged";
        public const string NOTIFY_ORDER_PRINTED = "NotifyOrderPrinted";
        public const string NOTIFY_ORDER_DELETED = "NotifyOrderDeleted";
    }
}
