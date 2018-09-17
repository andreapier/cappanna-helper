import { HubConnectionBuilder, JsonHubProtocol } from "@aspnet/signalr";
import {
  orderCreated,
  orderChanged,
  orderPrinted,
  orderDeleted,
  orderClosed,
  menuDetailsChanged
} from "actions";

class SignalR {
  constructor(dispatch) {
    this.dispatch = dispatch;
    this.chHubConnection = new HubConnectionBuilder()
      .withUrl("/hubs/ch")
      .withHubProtocol(new JsonHubProtocol())
      .build();

    this.chHubConnection.on("NotifyOrderCreated", data =>
      this.dispatch(orderCreated(data))
    );

    this.chHubConnection.on("NotifyOrderChanged", data =>
      this.dispatch(orderChanged(data))
    );

    this.chHubConnection.on("NotifyOrderPrinted", data =>
      this.dispatch(orderPrinted(data))
    );

    this.chHubConnection.on("NotifyOrderDeleted", data =>
      this.dispatch(orderDeleted(data))
    );

    this.chHubConnection.on("NotifyOrderClosed", data =>
      this.dispatch(orderClosed(data))
    );

    this.chHubConnection.on("NotifyMenuDetailsChanged", data => {
      this.dispatch(menuDetailsChanged(data));
    });

    this.chHubConnection.onclose(err => {
      if (!err) {
        return;
      }

      console.error("Connection closed with error", err);
      this.reconnect();
    });
  }

  reconnect(failedRetry = 0, interval = 1000) {
    if (failedRetry === 100) {
      return;
    }

    return this.connectNoError().catch(err => {
      console.error("Error trying to automatically reconnect", err);
      setTimeout(() => this.reconnect(failedRetry++, interval * 2), interval);
    });
  }

  connectNoError() {
    return this.chHubConnection.start();
  }

  connect() {
    return this.connectNoError().catch(err => console.error(err));
  }

  disconnect() {
    return this.chHubConnection.stop().catch(err => console.error(err));
  }
}

export default SignalR;
