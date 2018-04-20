import { all } from "redux-saga/effects";
import signinSaga from "./signinSaga";
import signoutSaga from "./signoutSaga";
import loadUserDataSaga from "./loadUserDataSaga";
import sendOrderSaga from "./sendOrderSaga";
import loadOrdersListSaga from "./loadOrdersListSaga";
import loadOrderSaga from "./loadOrderSaga";
import printOrderSaga from "./printOrderSaga";
import setOrderStatusSaga from "./setOrderStatusSaga";
import loadMenuDetailsSaga from "./loadMenuDetailsSaga";

function* rootSaga() {
  yield all([
    signinSaga(),
    signoutSaga(),
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
