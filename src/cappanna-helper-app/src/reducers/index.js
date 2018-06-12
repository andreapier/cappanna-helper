import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import user from "./user";
import api from "./api";
import menuDetails from "./menuDetails";
import orders from "./orders";
import error from "./error";
import newOrder from "./newOrder";
import selectedOrder from "./selectedOrder";

const rootReducer = combineReducers({
  form: formReducer,
  user,
  api,
  menuDetails,
  orders,
  newOrder,
  error,
  selectedOrder
});

export default rootReducer;
