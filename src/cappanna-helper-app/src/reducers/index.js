import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import user from "./user";
import api from "./api";
import menuDetails from "./menuDetails";
import orders from "./orders";
import message from "./message";
import newOrder from "./newOrder";
import selectedOrder from "./selectedOrder";
import notifications from "./notifications";

const rootReducer = combineReducers({
  form: formReducer,
  user,
  api,
  menuDetails,
  orders,
  newOrder,
  message,
  selectedOrder,
  notifications
});

export default rootReducer;
