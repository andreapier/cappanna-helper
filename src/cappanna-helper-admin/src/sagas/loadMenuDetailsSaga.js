import { put, takeLatest, call } from "redux-saga/effects";
import {
  loadMenuDetailsCompleted,
  setError,
  loadingChanged,
  signoutRequested
} from 'actions';
import { LOAD_MENU_DETAILS_REQUESTED } from 'actions/types';
import Api from 'api';

function* loadMenuDetails(action) {
  try {
    yield put(loadingChanged(true, "Caricamento menu..."));
    const api = new Api();
    const menuDetails = yield call(api.getMenuDetails);
    yield put(loadMenuDetailsCompleted(menuDetails));
  } catch (e) {
    if (e.response && e.response.status === 401) {
      yield put(signoutRequested());
    } else {
      yield put(setError(e.message));
    }
  }
  finally {
    yield put(loadingChanged(false));
  }
}

function* loadMenuDetailsSaga() {
  yield takeLatest(LOAD_MENU_DETAILS_REQUESTED, loadMenuDetails);
}

export default loadMenuDetailsSaga;
