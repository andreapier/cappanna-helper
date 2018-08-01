import { put, takeLatest, call } from "redux-saga/effects";
import {
  loadingChanged,
  signalApiError,
  loadOrdersListCompleted
} from "actions";
import { LOAD_ORDERS_LIST_REQUESTED } from "actions/types";
import Api from "api";
import history from "./../history";

function* loadOrdersList(action) {
  try {
    yield put(loadingChanged(true, "Caricamento ordini..."));
    const api = new Api();
    const orders = yield call(api.getOrders);
    yield put(loadOrdersListCompleted(orders));
    history.push("/order");
  } catch (e) {
    yield put(signalApiError(e));
  } finally {
    yield put(loadingChanged(false));
  }
}

function* loadOrdersListSaga() {
  yield takeLatest(LOAD_ORDERS_LIST_REQUESTED, loadOrdersList);
}

export default loadOrdersListSaga;
