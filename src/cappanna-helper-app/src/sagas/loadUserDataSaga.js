import { put, takeLatest, call } from "redux-saga/effects";
import {
  signinCompleted,
  loadingChanged,
  createEmptyOrder,
  loadMenuDetailsCompleted,
  setError,
  signoutRequested
} from "actions";
import { LOAD_USER_DATA } from "actions/types";
import localforage from "localforage";
import Api from "api";
import history from "./../history";

const loadToken = () =>
  localforage
    .getItem("token")
    .then(token => token)
    .catch(err => console.log("Error loading token from local storage", err));

function* loadMenuDetails() {
  const api = new Api();
  const menuDetails = yield call(api.getMenuDetails);
  yield put(loadMenuDetailsCompleted(menuDetails));
  return menuDetails;
}

function* loadUserData() {
  try {
    yield put(loadingChanged(true, "Caricamento dati utente..."));
    const token = yield loadToken();

    if (!token) {
      return;
    }

    const api = new Api();
    const userData = yield call(api.signinByToken, token);
    yield put(loadingChanged(true, "Caricamento menu..."));
    const menuDetails = yield loadMenuDetails();
    yield put(createEmptyOrder(menuDetails));
    yield put(signinCompleted(userData.user));
    history.push("/order/new");
  } catch (e) {
    if (e.response && e.response.status === 401) {
      yield put(signoutRequested());
    } else {
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
