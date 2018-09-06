import { call, put, takeLatest } from "redux-saga/effects";
import Api from "api";
import { loadingChanged, signalApiError } from "actions";
import { CLOSE_ORDER } from "actions/types";

function* closeOrder(action) {
  try {
    yield put(loadingChanged(true, "Chiusura ordine in corso..."));
    const api = new Api();
    yield call(api.closeOrder, action.payload);
  } catch (e) {
    yield put(signalApiError(e));
  } finally {
    yield put(loadingChanged(false));
  }
}

function* closeOrderSaga() {
  yield takeLatest(CLOSE_ORDER, closeOrder);
}

export default closeOrderSaga;
