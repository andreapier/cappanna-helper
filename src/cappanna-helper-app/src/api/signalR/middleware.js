import { SIGNIN_COMPLETED, SIGNOUT_COMPLETED } from "actions/types";
import SignalR from "api/signalR";

const signalrMiddleware = ({ dispatch }) => {
  let signalR;

  return next => action => {
    switch (action.type) {
      case SIGNIN_COMPLETED:
        signalR = new SignalR(dispatch, action.payload);
        return signalR.connect().then(() => next(action));

      case SIGNOUT_COMPLETED:
        return signalR.disconnect().then(() => next(action));

      default:
        return next(action);
    }
  };
};

export default signalrMiddleware;
