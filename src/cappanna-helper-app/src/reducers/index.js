import { combineReducers } from "redux";
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
import aggregation from "reducers/aggregation";
import settings from "reducers/settings";
import stands from "reducers/stands";
import users from "reducers/users";

const rootReducer = combineReducers({
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
    dashboard,
    aggregation,
    settings,
    stands,
    users
});

export default rootReducer;
