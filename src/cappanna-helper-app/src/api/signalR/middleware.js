import { CONNECT_SIGNALR, DISCONNECT_SIGNALR } from "actions/types";
import SignalR from "api/signalR";

const signalrMiddleware = ({ dispatch }) => {
  let signalR;

  return next => action => {
    if (!action.metadata || !action.metadata.signalR) {
      return next(action);
    }

    switch (action.type) {
      case CONNECT_SIGNALR:
        signalR = new SignalR(dispatch, action.payload);
        return signalR.connect().then(() => next(action));

      case DISCONNECT_SIGNALR:
        return signalR.disconnect().then(() => next(action));

      default:
        return next(action);
    }
  };
};

export default signalrMiddleware;
