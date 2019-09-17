import { put, takeLatest, call } from "redux-saga/effects";
import {
  loadingChanged,
  signalApiError,
  loadUsersListCompleted
} from "actions";
import { LOAD_USERS_LIST_REQUESTED } from "actions/types";
import Api from "api";

function* loadUsersList(action) {
  try {
    yield put(loadingChanged(true, "Caricamento utenti..."));
    const api = new Api();
    const settings = yield call(api.getUsers);
    yield put(loadUsersListCompleted(settings));
  } catch (e) {
    yield put(signalApiError(e));
  } finally {
    yield put(loadingChanged(false));
  }
}

function* loadUsersListSaga() {
  yield takeLatest(LOAD_USERS_LIST_REQUESTED, loadUsersList);
}

export default loadUsersListSaga;
