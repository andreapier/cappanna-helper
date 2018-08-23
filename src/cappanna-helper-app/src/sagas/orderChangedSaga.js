import { select, takeLatest, put } from "redux-saga/effects";
import { ORDER_CHANGED, ORDER_PRINTED, ORDER_DELETED } from "actions/types";
import history from "./../history";
import { notifyWarning, resetOrder } from "actions";

function* orderChanged(action) {
  const state = yield select();
  const lastOperation = action.payload.operations.slice(-1)[0];
  
  if (state.newOrderHeader.id === action.payload.id && lastOperation.userId !== state.user.userId) {
    if (action.type === ORDER_DELETED) {
      yield put(notifyWarning("L'ordine è stato cancellato, ricrearlo se necessario"));
      history.push("order/new");
    } else {
      yield put(notifyWarning("L'ordine è cambiato, ripetere le modifiche"));
      history.push(`order/${action.payload.id}`);
    }

    yield put(resetOrder());
  }
}

function* orderChangedSaga() {
  yield takeLatest([ORDER_CHANGED, ORDER_PRINTED, ORDER_DELETED], orderChanged);
}

export default orderChangedSaga;
