import { all } from "redux-saga/effects";
import signinSaga from "./signinSaga";
import signoutSaga from "./signoutSaga";
import signupSaga from "./signupSaga";
import loadUserDataSaga from "./loadUserDataSaga";
import confirmOrderSaga from "./confirmOrderSaga";
import deleteOrderSaga from "./deleteOrderSaga";
import loadOrdersListSaga from "./loadOrdersListSaga";
import loadSelectedOrderSaga from "./loadSelectedOrderSaga";
import printOrderSaga from "./printOrderSaga";
import loadMenuDetailsSaga from "./loadMenuDetailsSaga";
import signalApiErrorSaga from "./signalApiErrorSaga";
import orderChangedSaga from "./orderChangedSaga";
import loadNotificationsListSaga from "./loadNotificationsListSaga";

function* rootSaga() {
  yield all([
    signinSaga(),
    signoutSaga(),
    signupSaga(),
    loadUserDataSaga(),
    confirmOrderSaga(),
    deleteOrderSaga(),
    loadOrdersListSaga(),
    loadSelectedOrderSaga(),
    printOrderSaga(),
    loadMenuDetailsSaga(),
    signalApiErrorSaga(),
    orderChangedSaga(),
    loadNotificationsListSaga()
  ]);
}

export default rootSaga;
