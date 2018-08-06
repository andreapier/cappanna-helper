import { select, takeLatest, put } from "redux-saga/effects";
import { ORDER_CHANGED, ORDER_PRINTED } from "actions/types";
import history from "./../history";
import { notifyWarning, resetOrder } from "actions";

function* orderChanged(action) {
  const state = yield select();

  if (state.newOrder.id === action.payload.id) {
    yield put(notifyWarning("L'ordine è cambiato, ripetere le modifiche"));
    yield put(resetOrder());
    history.push(`order/${action.payload.id}`);
  }
}

function* orderChangedSaga() {
  yield takeLatest([ORDER_CHANGED, ORDER_PRINTED], orderChanged);
}

export default orderChangedSaga;
