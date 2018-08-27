using Microsoft.AspNetCore.SignalR;

namespace CappannaHelper.Api.Hubs
{
    public class MenuHub : Hub
    {
        public const string NOTIFY_MENU_DETAILS_CHANGED = "NotifyMenuDetailsChanged";
    }
}
