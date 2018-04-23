import { call, put, takeLatest } from "redux-saga/effects";
import Api from "api";
import { loadingChanged, setError, signoutRequested, loadOrderRequested, resetOrder } from "actions";
import { SEND_ORDER } from "actions/types";

function* sendOrder(action) {
  try {
    yield put(loadingChanged(true, "Ordine in corso..."));
    const api = new Api();
    const order = yield call(api.sendOrder, action.payload);
    yield put(loadOrderRequested(order.id));
    yield put(resetOrder());
  } catch (e) {
    if (e.response && e.response.status === 401) {
      yield put(signoutRequested());
    } else {
      yield put(setError(e.message));
    }
  }
}

function* sendOrderSaga() {
  yield takeLatest(SEND_ORDER, sendOrder);
}

export default sendOrderSaga;
