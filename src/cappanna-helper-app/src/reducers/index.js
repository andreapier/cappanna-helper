import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import user from "reducers/user";
import api from "reducers/api";
import menuDetails from "reducers/menuDetails";
import orders from "reducers/orders";
import message from "reducers/message";
import newOrderHeader from "reducers/newOrder/header";
import newOrderDetails from "reducers/newOrder/details";
import selectedOrder from "reducers/selectedOrder";
import notifications from "reducers/notifications";
import calculator from "reducers/calculator";
import dashboard from "reducers/dashboard";

const rootReducer = combineReducers({
  form: formReducer,
  user,
  api,
  menuDetails,
  orders,
  newOrderHeader,
  newOrderDetails,
  message,
  selectedOrder,
  notifications,
  calculator,
  dashboard
});

export default rootReducer;
