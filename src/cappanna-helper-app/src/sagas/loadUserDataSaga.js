import { put, takeLatest, call } from "redux-saga/effects";
import {
  signinCompleted,
  loadingChanged,
  createEmptyOrder,
  loadMenuDetailsCompleted,
  setError,
  signoutRequested,
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

function* loadMenuDetails() {
  const api = new Api();
  const menuDetails = yield call(api.getMenuDetails);
  yield put(loadMenuDetailsCompleted(menuDetails));
  return menuDetails;
}

function* loadUserData() {
  try {
    yield put(loadingChanged(true, "Caricamento dati utente..."));
    const userData = yield loadUserDataFromStorage();

    if (!userData) {
      return;
    }

    const api = new Api();
    api.signinByToken(userData);
    yield put(loadingChanged(true, "Caricamento menu..."));
    const menuDetails = yield loadMenuDetails();
    yield put(createEmptyOrder(menuDetails));
    yield put(signinCompleted(userData));
    yield put(connectSignalR(userData));
    history.push("/order/new");
  } catch (e) {
    if (e.response && e.response.status === 401) {
      yield put(signoutRequested());
    } else {
      console.error(e);
      yield put(setError(e.message));
    }
  } finally {
    yield put(loadingChanged(false));
  }

  yield put(loadingChanged(false));
}

function* loadUserDataSaga() {
  yield takeLatest(LOAD_USER_DATA, loadUserData);
}

export default loadUserDataSaga;
