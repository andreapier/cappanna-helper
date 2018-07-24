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

    this.orderHubConnection.on("NotifyOrderCreated", data =>
      this.dispatch(orderCreated(data))
    );
  }

  connect() {
    return Promise.all([
      this.menuHubConnection.start().catch(err => console.error(err)),
      this.orderHubConnection.start().catch(err => console.error(err))
    ]);
  }

  disconnect() {
    return Promise.all([
      this.menuHubConnection.stop().catch(err => console.error(err)),
      this.orderHubConnection.stop().catch(err => console.error(err))
    ]);
  }
}

export default SignalR;
