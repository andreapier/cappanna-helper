import { all } from "redux-saga/effects";
import signinSaga from "./signinSaga";
import signoutSaga from "./signoutSaga";
import signupSaga from "./signupSaga";
import loadUserDataSaga from "./loadUserDataSaga";
import confirmOrderSaga from "./confirmOrderSaga";
import loadOrdersListSaga from "./loadOrdersListSaga";
import loadSelectedOrderSaga from "./loadSelectedOrderSaga";
import printOrderSaga from "./printOrderSaga";
import loadMenuDetailsSaga from "./loadMenuDetailsSaga";
import signalApiErrorSaga from "./signalApiErrorSaga";
import orderChangedSaga from "./orderChangedSaga";

function* rootSaga() {
  yield all([
    signinSaga(),
    signoutSaga(),
    signupSaga(),
    loadUserDataSaga(),
    confirmOrderSaga(),
    loadOrdersListSaga(),
    loadSelectedOrderSaga(),
    printOrderSaga(),
    loadMenuDetailsSaga(),
    signalApiErrorSaga(),
    orderChangedSaga()
  ]);
}

export default rootSaga;
