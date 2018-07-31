import { put, takeLatest, call } from "redux-saga/effects";
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
    history.push("/order/new");
    yield put(loadMenuDetailsRequested());
  } catch (e) {
    signalApiError(e);
  } finally {
    yield put(loadingChanged(false));
  }

  yield put(loadingChanged(false));
}

function* loadUserDataSaga() {
  yield takeLatest(LOAD_USER_DATA, loadUserData);
}

export default loadUserDataSaga;
