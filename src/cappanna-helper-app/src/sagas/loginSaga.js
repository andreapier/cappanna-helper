import { call, put, takeLatest } from "redux-saga/effects";
import Api from "./../api/Api";
import {
  loginCompleted,
  errorOccurred,
  loadingChanged,
  createEmptyOrder,
  loadMenuDetailsCompleted
} from "./../actions";
import { LOGIN_REQUESTED } from "./../actions/types";
import localforage from "localforage";
import history from "./../history";

const saveToken = token =>
  localforage
    .setItem("token", token)
    .catch(err => console.log("Error saving token data in local storage", err));

function* loadMenuDetails() {
  const api = new Api();
  const menuDetails = yield call(api.getMenuDetails);
  yield put(loadMenuDetailsCompleted(menuDetails));
  return menuDetails;
}

function* login(action) {
  try {
    yield put(loadingChanged(true, "Login in corso..."));
    const api = new Api();
    const userData = yield call(api.login, action.payload);
    yield saveToken(userData.token.value);
    yield put(loadingChanged(true, "Caricamento menu..."));
    const menuDetails = yield loadMenuDetails();
    yield put(createEmptyOrder(menuDetails));
    yield put(loginCompleted(userData.user));
    history.push("/order/new");
  } catch (e) {
    yield put(errorOccurred(e.message));
  } finally {
    yield put(loadingChanged(false));
  }
}

function* loginSaga() {
  yield takeLatest(LOGIN_REQUESTED, login);
}

export default loginSaga;
