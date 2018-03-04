import { call, put, takeLatest } from "redux-saga/effects";
import Api from "./../api/Api";
import { loadingChanged, errorOccurred, logoutRequested, setOrderStatusCompleted } from "./../actions";
import { SET_ORDER_STATUS_REQUESTED } from "./../actions/types";

function* setOrderStatus(action) {
  try {
    yield put(loadingChanged(true, "Aggiornamento ordine in corso..."));
    const api = new Api();
    const order = yield call(api.setOrderStatus, action.payload);
    yield put(setOrderStatusCompleted(order));
  } catch (e) {
    if (e.response && e.response.status === 401) {
      yield put(logoutRequested());
    } else {
      yield put(errorOccurred(e.message));
    }
  }

  yield put(loadingChanged(false));
}

function* setOrderStatusSaga() {
  yield takeLatest(SET_ORDER_STATUS_REQUESTED, setOrderStatus);
}

export default setOrderStatusSaga;