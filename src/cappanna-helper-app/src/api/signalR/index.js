import { HubConnectionBuilder, JsonHubProtocol } from "@aspnet/signalr";
import {
  orderCreated,
  orderChanged,
  orderPrinted,
  orderDeleted,
  menuDetailsChanged,
  dashboardDataChanged
} from "actions";

class SignalR {
  constructor(dispatch, userData) {
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
    
    this.chHubConnection.on("NotifyMenuDetailsChanged", data =>
      this.dispatch(menuDetailsChanged(data))
    );

    if (userData.roles.some(r => r === "admin")) {
      this.chHubConnection.on("NotifyDashboardDataChanged", data =>
        this.dispatch(dashboardDataChanged(data))
      );
    }
  }

  connect() {
    return this.chHubConnection.start().catch(err => console.error(err));
  }

  disconnect() {
    return this.chHubConnection.stop().catch(err => console.error(err));
  }
}

export default SignalR;
