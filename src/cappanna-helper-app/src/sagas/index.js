import { all } from "redux-saga/effects";
import signinSaga from "./signinSaga";
import signoutSaga from "./signoutSaga";
import signupSaga from "./signupSaga";
import loadUserDataSaga from "./loadUserDataSaga";
import confirmOrderSaga from "./confirmOrderSaga";
import loadOrdersListSaga from "./loadOrdersListSaga";
import loadSelectedOrderSaga from "./loadSelectedOrderSaga";
import printOrderSaga from "./printOrderSaga";
import setOrderStatusSaga from "./setOrderStatusSaga";
import loadMenuDetailsSaga from "./loadMenuDetailsSaga";

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
    setOrderStatusSaga(),
    loadMenuDetailsSaga()
  ]);
}

export default rootSaga;
