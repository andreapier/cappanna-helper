using CappannaHelper.Api.Persistence.Modelling;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace CappannaHelper.Api.Hubs
{
    [Authorize]
    public class OrderHub : Hub
    {
        public const string NOTIFY_ORDER_CREATED = "NotifyOrderCreated";
    }
}
