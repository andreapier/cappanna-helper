import { call, put, takeLatest } from "redux-saga/effects";
import Api from "api";
import {
  loadingChanged,
  signalApiError,
  loadSelectedOrderRequested,
  resetOrder,
  signalApiError
} from "actions";
import { CONFIRM_ORDER } from "actions/types";

function* confirmOrder(action) {
  try {
    yield put(loadingChanged(true, "Ordine in corso..."));
    
    const api = new Api();
    const order = yield call(action.payload.id ? api.editOrder : api.createOrder, action.payload);
    yield put(loadSelectedOrderRequested(order.id));
    yield put(resetOrder());
  } catch (e) {
    signalApiError(e);
  } finally {
    yield put(loadingChanged(false));
  }
}

function* confirmOrderSaga() {
  yield takeLatest(CONFIRM_ORDER, confirmOrder);
}

export default confirmOrderSaga;
