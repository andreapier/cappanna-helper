import { select, takeLatest, put } from "redux-saga/effects";
import { MENU_DETAIL_CHANGED } from "actions/types";
import { notifyInfo, notifyWarning } from "actions";

function* menuDetailChanged(action) {
  const state = yield select();  
  if (action.payload.unitsInStock === 0) {
    const item = state.newOrderDetails.find(e => e.itemId === action.payload.id);
    if (item.quantity > 0) {
      yield put(notifyWarning(`Il piatto '${action.payload.name}' non è più disponibile. Rimuoverlo dall'ordine.`));
    } else {
      yield put(notifyInfo(`Il piatto '${action.payload.name}' non è più disponibile.`));
    }
  } else if (action.payload.unitsInStock <= 10) {
    yield put(notifyInfo(`Rimangono solo ${action.payload.unitsInStock} porzioni del piatto '${action.payload.name}'.`));
  } else {
    yield put(notifyInfo(`Il piatto '${action.payload.name}' è di nuovo disponibile.`));
  }
}

function* menuDetailChangedSaga() {
  yield takeLatest(MENU_DETAIL_CHANGED, menuDetailChanged);
}

export default menuDetailChangedSaga;
