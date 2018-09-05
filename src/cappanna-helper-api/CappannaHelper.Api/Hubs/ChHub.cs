using Microsoft.AspNetCore.SignalR;

namespace CappannaHelper.Api.Hubs
{
    public class ChHub : Hub
    {
        public const string NOTIFY_ORDER_CREATED = "NotifyOrderCreated";
        public const string NOTIFY_ORDER_CHANGED = "NotifyOrderChanged";
        public const string NOTIFY_ORDER_PRINTED = "NotifyOrderPrinted";
        public const string NOTIFY_ORDER_DELETED = "NotifyOrderDeleted";
        public const string NOTIFY_ORDER_CLOSED = "NotifyOrderClosed";

        public const string NOTIFY_MENU_DETAILS_CHANGED = "NotifyMenuDetailsChanged";
    }
}
