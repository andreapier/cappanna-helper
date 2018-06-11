import { HubConnectionBuilder, LogLevel } from "@aspnet/signalr";
import { menuDetailAvailabilityChanged } from "actions";

const getOptions = token => {
  return {
    accessTokenFactory: () => token
  };
};

class SignalR {
  constructor(dispatch) {
    this.dispatch = dispatch;
  }

  connect({ token }) {
    const options = getOptions(token);
    this.menuHubConnection = new HubConnectionBuilder()
      .withUrl("/hubs/menu", options)
      .configureLogging(LogLevel.Trace)
      .build();
    this.orderHubConnection = new HubConnectionBuilder()
      .withUrl("/hubs/order", options)
      .configureLogging(LogLevel.Trace)
      .build();

    this.menuHubConnection.on("NotifyAvailability", data =>
      this.dispatch(menuDetailAvailabilityChanged(data))
    );
    this.orderHubConnection.on("NotifyOrderCreated", data =>
      //this.dispatch(orderCreated(data))
      console.log(data)
    );

    return Promise.all([
      this.menuHubConnection
        .start()
        .catch(err => console.error(err.toString())),
      this.orderHubConnection
        .start()
        .catch(err => console.error(err.toString()))
    ]);
  }

  disconnect() {
    return Promise.all([
      this.menuHubConnection.stop(),
      this.orderHubConnection.stop()
    ]);
  }

  createMenuDetail(menuDetail) {
    this.connection.invoke("NotifyAvailability", menuDetail);
  }
}

export default SignalR;
