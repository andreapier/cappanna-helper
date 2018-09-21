import { call, put, takeLatest } from "redux-saga/effects";
import Api from "api";
import {
  loadingChanged,
  signalApiError,
  resetOrder,
  signalApiSuccess
} from "actions";
import { DELETE_ORDER } from "actions/types";
import history from "./../history";

function* deleteOrder(action) {
  try {
    yield put(loadingChanged(true, "Cancellazione ordine in corso..."));
    const api = new Api();
    yield call(api.deleteOrder, action.payload);
    yield put(signalApiSuccess());
    yield put(resetOrder());
    history.push("/order");
  } catch (e) {
    yield put(signalApiError(e));
  } finally {
    yield put(loadingChanged(false));
  }
}

function* deleteOrderSaga() {
  yield takeLatest(DELETE_ORDER, deleteOrder);
}

export default deleteOrderSaga;
