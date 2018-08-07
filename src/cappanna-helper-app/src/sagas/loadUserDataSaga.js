import { put, takeLatest } from "redux-saga/effects";
import {
  signinCompleted,
  loadingChanged,
  signalApiError,
  loadMenuDetailsRequested,
  connectSignalR
} from "actions";
import { LOAD_USER_DATA } from "actions/types";
import localforage from "localforage";
import Api from "api";
import history from "./../history";
import { getDefaultRoute } from "routes/helpers";

const loadUserDataFromStorage = () =>
  localforage
    .getItem("userData")
    .catch(err =>
      console.log("Error loading user data from local storage", err)
    );

function* loadUserData() {
  try {
    yield put(loadingChanged(true, "Caricamento dati utente..."));
    const userData = yield loadUserDataFromStorage();

    if (!userData) {
      return;
    }

    const api = new Api();
    api.setToken(userData.token);
    yield put(signinCompleted(userData));
    yield put(connectSignalR(userData));
    yield put(loadMenuDetailsRequested());

    const route = getDefaultRoute(userData.roles[0]);
    history.push(route);
  } catch (e) {
    yield put(signalApiError(e));
  } finally {
    yield put(loadingChanged(false));
  }
}

function* loadUserDataSaga() {
  yield takeLatest(LOAD_USER_DATA, loadUserData);
}

export default loadUserDataSaga;
