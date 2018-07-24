import { HubConnectionBuilder, JsonHubProtocol } from "@aspnet/signalr";
import { orderCreated } from "actions";

class SignalR {
  constructor(dispatch) {
    this.dispatch = dispatch;
    this.menuHubConnection = new HubConnectionBuilder()
      .withUrl("/hubs/menu")
      .withHubProtocol(new JsonHubProtocol())
      .build();
    this.orderHubConnection = new HubConnectionBuilder()
      .withUrl("/hubs/order")
      .withHubProtocol(new JsonHubProtocol())
      .build();

    this.orderHubConnection.on("NotifyOrderCreated", data => this.dispatch(orderCreated(data)));
  }

  connect() {
    return Promise.all([
      this.menuHubConnection
        .start()
        .then(() => console.log("menuHubConnection connected"))
        .catch(err => console.error(err)),
      this.orderHubConnection
        .start()
        .then(() => console.log("orderHubConnection connected"))
        .catch(err => console.error(err))
    ]);
  }

  disconnect() {
    return Promise.all([
      this.menuHubConnection
        .stop()
        .then(() => console.log("menuHubConnection disconnected"))
        .catch(err => console.error(err)),
      this.orderHubConnection
        .stop()
        .then(() => console.log("menuHubConnection disconnected"))
        .catch(err => console.error(err))
    ]);
  }
}

export default SignalR;
