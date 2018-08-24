import { select, put, takeLatest, call } from "redux-saga/effects";
import {
  loadingChanged,
  loadMenuDetailsCompleted,
  createEmptyOrder,
  signalApiError
} from "actions";
import { LOAD_MENU_DETAILS_REQUESTED } from "actions/types";
import Api from "api";

function* loadMenuDetails(action) {
  try {
    yield put(loadingChanged(true, "Caricamento menu..."));
    const api = new Api();
    const menuDetails = yield call(api.getMenuDetails);
    yield put(loadMenuDetailsCompleted(menuDetails));
    const state = yield select();
    
    if (state.newOrderDetails.length === 0) {
      yield put(createEmptyOrder(menuDetails));
    }
  } catch (e) {
    yield put(signalApiError(e));
  } finally {
    yield put(loadingChanged(false));
  }
}

function* loadMenuDetailsSaga() {
  yield takeLatest(LOAD_MENU_DETAILS_REQUESTED, loadMenuDetails);
}

export default loadMenuDetailsSaga;
