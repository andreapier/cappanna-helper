import { HubConnectionBuilder } from "@aspnet/signalr";

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
      .build();
    this.orderHubConnection = new HubConnectionBuilder()
      .withUrl("/hubs/order", options)
      .build();

    this.orderHubConnection.on("NotifyOrderCreated", data =>
      //this.dispatch(orderCreated(data))
      console.log(data)
    );

    this.menuHubConnection
      .start()
      .then(() => console.log("connected menu hub"))
      .catch(err => console.error(err.toString()));

    this.orderHubConnection
      .start()
      .then(() => console.log("connected order hub"))
      .catch(err => console.error(err.toString()));
  }

  disconnect() {
    this.orderHubConnection.stop();
  }
}

export default SignalR;
