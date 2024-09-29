import { HubConnectionBuilder, HubConnectionState, JsonHubProtocol, LogLevel } from "@microsoft/signalr";
import { orderCreated, orderChanged, orderPrinted, orderDeleted, orderClosed, menuDetailsChanged } from "actions";

class SignalR {
  constructor(dispatch, loginData) {
    this.dispatch = dispatch;
    this.chHubConnection = new HubConnectionBuilder()
      .withUrl("/hubs/ch", { accessTokenFactory: () => loginData.token })
      .withHubProtocol(new JsonHubProtocol())
      //.configureLogging(LogLevel.Debug)
      .configureLogging(LogLevel.Information)
      .withAutomaticReconnect()
      .build();

    this.chHubConnection.on("NotifyOrderCreated", (data) => this.dispatch(orderCreated(data)));
    this.chHubConnection.on("NotifyOrderChanged", (data) => this.dispatch(orderChanged(data)));
    this.chHubConnection.on("NotifyOrderPrinted", (data) => this.dispatch(orderPrinted(data)));
    this.chHubConnection.on("NotifyOrderDeleted", (data) => this.dispatch(orderDeleted(data)));
    this.chHubConnection.on("NotifyOrderClosed", (data) => this.dispatch(orderClosed(data)));
    this.chHubConnection.on("NotifyMenuDetailsChanged", (data) => this.dispatch(menuDetailsChanged(data)));

    this.chHubConnection.onclose((err) => {
      if (!err) {
        return;
      }

      console.error("Connection closed with error", err);
      this.reconnect();
    });
  }

  async reconnect(failedRetry = 0, interval = 1000) {
    if (failedRetry === 100) {
      return;
    }

    try {
      return await this.connectNoError();
    } catch (err) {
      console.error("Error trying to automatically reconnect", err);
      setTimeout(() => this.reconnect(failedRetry++, interval * 2), interval);
    }
  }

  connectNoError() {
    if (!this.chHubConnection.state === HubConnectionState.Disconnected) {
      console.log("Connection is still alive, nothing to do");
    }

    return this.chHubConnection.start();
  }

  async connect() {
    try {
      return await this.connectNoError();
    } catch (err) {
      return console.error(err);
    }
  }

  async disconnect() {
    try {
      return await this.chHubConnection.stop();
    } catch (err) {
      return console.error(err);
    }
  }
}

export default SignalR;
