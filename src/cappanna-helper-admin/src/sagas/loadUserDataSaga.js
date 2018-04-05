import { put, takeLatest } from "redux-saga/effects";
import {
  signinCompleted,
  loadingChanged,
  errorOccurred,
  signoutRequested
} from "actions";
import { LOAD_USER_DATA } from "actions/types";
import localforage from "localforage";
import history from "./../history";
import CookieHelper from 'helpers/cookieHelper';

function* loadUserData() {
  try {
    yield put(loadingChanged(true, "Caricamento dati utente..."));

    const cookieHelper = new CookieHelper();
    const cookie = cookieHelper.read('CappannaHelper');

    console.log(cookie);

    if (!cookie) {
      return;
    }

    const user = yield localforage.getItem("user");

    if (!user) {
      return;
    }

    yield put(signinCompleted(user));
    history.push("/dashboard");
  } catch (e) {
    if (e.response && e.response.status === 401) {
      yield put(signoutRequested());
    } else {
      yield put(errorOccurred(e.message));
    }
  } finally {
    yield put(loadingChanged(false));
  }
}

function* loadUserDataSaga() {
  yield takeLatest(LOAD_USER_DATA, loadUserData);
}

export default loadUserDataSaga;