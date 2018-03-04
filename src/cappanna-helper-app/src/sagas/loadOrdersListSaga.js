import { put, takeLatest, call } from "redux-saga/effects";
import {
  loadOrdersListCompleted,
  errorOccurred,
  loadingChanged,
  logoutRequested
} from "./../actions";
import { LOAD_ORDERS_LIST_REQUESTED } from "./../actions/types";
import Api from "./../api/Api";
import history from "./../history";

function* loadOrdersList(action) {
  try {
    yield put(loadingChanged(true, "Caricamento ordini..."));
    const api = new Api();
    const orders = yield call(api.getOrders);
    yield put(loadOrdersListCompleted(orders));
    history.push("/order");
  } catch (e) {
    if (e.response && e.response.status === 401) {
      yield put(logoutRequested());
    } else {
      yield put(errorOccurred(e.message));
    }
  }

  yield put(loadingChanged(false));
}

function* loadOrdersListSaga() {
  yield takeLatest(LOAD_ORDERS_LIST_REQUESTED, loadOrdersList);
}

export default loadOrdersListSaga;