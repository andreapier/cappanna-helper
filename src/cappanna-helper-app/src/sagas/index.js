import { all } from "redux-saga/effects";
import signinSaga from "./signinSaga";
import signoutSaga from "./signoutSaga";
import signupSaga from "./signupSaga";
import loadUserDataSaga from "./loadUserDataSaga";
import confirmOrderSaga from "./confirmOrderSaga";
import orderChangedSaga from "./orderChangedSaga";
import deleteOrderSaga from "./deleteOrderSaga";
import loadOrdersListSaga from "./loadOrdersListSaga";
import loadSelectedOrderSaga from "./loadSelectedOrderSaga";
import printOrderSaga from "./printOrderSaga";
import loadMenuDetailsSaga from "./loadMenuDetailsSaga";
import editMenuDetailSaga from "./editMenuDetailSaga";
import menuDetailsChangedSaga from "./menuDetailsChangedSaga";
import signalApiErrorSaga from "./signalApiErrorSaga";
import loadNotificationsListSaga from "./loadNotificationsListSaga";

function* rootSaga() {
  yield all([
    signinSaga(),
    signoutSaga(),
    signupSaga(),
    loadUserDataSaga(),
    loadOrdersListSaga(),
    confirmOrderSaga(),
    orderChangedSaga(),
    deleteOrderSaga(),
    loadSelectedOrderSaga(),
    printOrderSaga(),
    loadMenuDetailsSaga(),
    editMenuDetailSaga(),
    menuDetailsChangedSaga(),
    signalApiErrorSaga(),
    loadNotificationsListSaga()
  ]);
}

export default rootSaga;
