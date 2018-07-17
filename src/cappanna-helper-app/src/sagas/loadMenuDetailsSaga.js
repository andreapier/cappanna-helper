import { put, takeLatest, call } from "redux-saga/effects";
import {
  loadingChanged,
  setError,
  signoutRequested,
  loadMenuDetailsCompleted,
  createEmptyOrder
} from "actions";
import { LOAD_MENU_DETAILS_REQUESTED } from "actions/types";
import Api from "api";

function* loadMenuDetails(action) {
  try {
    yield put(loadingChanged(true, "Caricamento menu..."));
    const api = new Api();
    const menuDetails = yield call(api.getMenuDetails);
    menuDetails.sort((a, b) => a.id - b.id);
    yield put(loadMenuDetailsCompleted(menuDetails));
    yield put(createEmptyOrder(menuDetails));
  } catch (e) {
    if (e.response && e.response.status === 401) {
      yield put(signoutRequested());
    } else {
      console.error(e);
      yield put(setError(e.message));
    }
  }

  yield put(loadingChanged(false));
}

function* loadMenuDetailsSaga() {
  yield takeLatest(LOAD_MENU_DETAILS_REQUESTED, loadMenuDetails);
}

export default loadMenuDetailsSaga;
