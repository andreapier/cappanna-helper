import { put, takeLatest, call } from "redux-saga/effects";
import {
  loadingChanged,
  signalApiError,
  loadSelectedOrderCompleted
} from "actions";
import { LOAD_SELECTED_ORDER_REQUESTED } from "actions/types";
import Api from "api";
import history from "./../history";

function* loadSelectedOrder(action) {
  try {
    yield put(loadingChanged(true, "Caricamento ordine..."));
    const api = new Api();
    const order = yield call(api.getOrder, action.payload);
    yield put(loadSelectedOrderCompleted(order));
    history.push(`/order/${order.id}`);
  } catch (e) {
    signalApiError(e);
  }

  yield put(loadingChanged(false));
}

function* loadSelectedOrderSaga() {
  yield takeLatest(LOAD_SELECTED_ORDER_REQUESTED, loadSelectedOrder);
}

export default loadSelectedOrderSaga;
