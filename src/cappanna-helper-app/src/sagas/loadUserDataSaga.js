import { put, takeLatest, call } from "redux-saga/effects";
import {
  loginCompleted,
  loadingChanged,
  createEmptyOrder,
  loadMenuDetailsCompleted,
  errorOccurred,
  logoutRequested
} from "./../actions";
import { LOAD_USER_DATA } from "./../actions/types";
import localforage from "localforage";
import Api from "./../api/Api";
import history from "./../history";

const loadToken = () =>
localforage
  .getItem("token")
  .then(token => token)
  .catch(err =>
    console.log("Error loading token from local storage", err)
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
    const token = yield loadToken();

    if (!token) {
      return;
    }

    const api = new Api();
    const userData = yield call(api.loginByToken, token);
    yield put(loadingChanged(true, "Caricamento menu..."));
    const menuDetails = yield loadMenuDetails();
    yield put(createEmptyOrder(menuDetails));
    yield put(loginCompleted(userData.user));
    history.push("/order/new");
  } catch (e) {
    if (e.response && e.response.status === 401) {
      yield put(logoutRequested());
    } else {
      yield put(errorOccurred(e.message));
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