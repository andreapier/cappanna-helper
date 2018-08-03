import { HubConnectionBuilder, JsonHubProtocol } from "@aspnet/signalr";
import { orderCreated, orderChanged, orderPrinted } from "actions";

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
    
    this.orderHubConnection.on("NotifyOrderChanged", data =>
      this.dispatch(orderChanged(data))
    );
    
    this.orderHubConnection.on("NotifyOrderPrinted", data =>
      this.dispatch(orderPrinted(data))
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
