import {
  CONNECT_SIGNALR,
  DISCONNECT_SIGNALR,
  ADD_MENU_DETAIL
} from "actions/types";
import SignalR from "api/signalR";

const signalrMiddleware = ({ dispatch }) => {
  const signalR = new SignalR(dispatch);

  return next => action => {
    if (!action.metadata || !action.metadata.signalR) {
      return next(action);
    }

    switch (action.type) {
      case CONNECT_SIGNALR:
        return signalR.connect({ ...action.payload }).then(() => {
          console.log("CONNECT_SIGNALR then");
          return next(action);
        });

      case DISCONNECT_SIGNALR:
        return signalR.disconnect().then(() => {
          console.log("DISCONNECT_SIGNALR then");
          return next(action);
        });

      case ADD_MENU_DETAIL:
        signalR.createMenuDetail(action.payload);
        break;

      default:
        break;
    }

    return next(action);
  };
};

export default signalrMiddleware;
