import { put, takeLatest, call } from "redux-saga/effects";
import { loadingChanged, setError, signoutRequested, loadOrderCompleted } from "actions";
import { LOAD_ORDER_REQUESTED } from "actions/types";
import Api from "api";
import history from "./../history";

function* loadOrder(action) {
  try {
    yield put(loadingChanged(true, "Caricamento ordine..."));
    const api = new Api();
    const order = yield call(api.getOrder, action.payload);
    yield put(loadOrderCompleted(order));
    history.push(`/order/${order.id}`);
  } catch (e) {
    if (e.response && e.response.status === 401) {
      yield put(signoutRequested());
    } else {
      yield put(setError(e.message));
    }
  }

  yield put(loadingChanged(false));
}

function* loadOrderSaga() {
  yield takeLatest(LOAD_ORDER_REQUESTED, loadOrder);
}

export default loadOrderSaga;
