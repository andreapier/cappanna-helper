import { put, takeLatest, call } from "redux-saga/effects";
import {
  loadingChanged,
  signalApiError,
  printCompleted
} from "actions";
import { PRINT_REQUESTED } from "actions/types";
import Api from "api";

function* printOrder(action) {
  try {
    yield put(loadingChanged(true, "Stampa in corso..."));
    const api = new Api();
    const order = yield call(api.printOrder, action.payload);
    yield put(printCompleted(order));
  } catch (e) {
    signalApiError(e);
  }

  yield put(loadingChanged(false));
}

function* printOrderSaga() {
  yield takeLatest(PRINT_REQUESTED, printOrder);
}

export default printOrderSaga;
