import { all } from "redux-saga/effects";
import loginSaga from "./loginSaga";
import logoutSaga from "./logoutSaga";
import loadUserDataSaga from "./loadUserDataSaga";
import sendOrderSaga from "./sendOrderSaga";
import loadOrdersListSaga from "./loadOrdersListSaga";
import loadOrderSaga from "./loadOrderSaga";
import printOrderSaga from "./printOrderSaga";
import setOrderStatusSaga from "./setOrderStatusSaga";
import loadMenuDetailsSaga from "./loadMenuDetailsSaga"

function* rootSaga() {
  yield all([
    loginSaga(),
    logoutSaga(),
    loadUserDataSaga(),
    sendOrderSaga(),
    loadOrdersListSaga(),
    loadOrderSaga(),
    printOrderSaga(),
    setOrderStatusSaga(),
    loadMenuDetailsSaga()
  ]);
}

export default rootSaga;