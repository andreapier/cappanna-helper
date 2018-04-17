import { HubConnection } from "@aspnet/signalr";
import { menuDetailAvailabilityChanged } from "actions";

class SignalR {
  constructor(dispatch) {
    this.dispatch = dispatch;
    this.connection = "";
  }

  connect({ token }) {
    const options = {
      accessTokenFactory: () => token
    };

    this.connection = new HubConnection("/menu", options);
    this.connection.on("NotifyAvailability", data =>
      this.dispatch(menuDetailAvailabilityChanged(data))
    );

    return this.connection.start();
  }

  disconnect() {
    return this.connection.stop();
  }

  createMenuDetail(menuDetail) {
    this.connection.invoke("NotifyAvailability", menuDetail);
  }
}

export default SignalR;
