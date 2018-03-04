import { put, takeLatest, call } from "redux-saga/effects";
import {
  loadMenuDetailsCompleted,
  errorOccurred,
  loadingChanged,
  logoutRequested,
  createEmptyOrder
} from "./../actions";
import { LOAD_MENU_DETAILS_REQUESTED } from "./../actions/types";
import Api from "./../api/Api";

function* loadMenuDetails(action) {
  try {
    yield put(loadingChanged(true, "Caricamento menu..."));
    const api = new Api();
    const menuDetails = yield call(api.getMenuDetails);
    yield put(loadMenuDetailsCompleted(menuDetails));
    yield put(createEmptyOrder(menuDetails));
  } catch (e) {
    if (e.response && e.response.status === 401) {
      yield put(logoutRequested());
    } else {
      yield put(errorOccurred(e.message));
    }
  }

  yield put(loadingChanged(false));
}

function* loadMenuDetailsSaga() {
  yield takeLatest(LOAD_MENU_DETAILS_REQUESTED, loadMenuDetails);
}

export default loadMenuDetailsSaga;
