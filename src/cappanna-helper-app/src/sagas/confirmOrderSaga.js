import { call, put, takeLatest } from "redux-saga/effects";
import Api from "api";
import {
  loadingChanged,
  setError,
  signoutRequested,
  loadOrderRequested,
  resetOrder
} from "actions";
import { CONFIRM_ORDER } from "actions/types";

function* confirmOrder(action) {
  try {
    yield put(loadingChanged(true, "Ordine in corso..."));
    const api = new Api();
    const order = yield call(api.createOrder, action.payload);
    yield put(loadOrderRequested(order.id));
    yield put(resetOrder());
  } catch (e) {
    if (e.response && e.response.status === 401) {
      yield put(signoutRequested());
    } else {
      yield put(setError(e.message));
    }

    yield put(loadingChanged(false));
  }
}

function* confirmOrderSaga() {
  yield takeLatest(CONFIRM_ORDER, confirmOrder);
}

export default confirmOrderSaga;
