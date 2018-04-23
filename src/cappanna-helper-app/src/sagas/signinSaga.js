import { call, put, takeLatest } from "redux-saga/effects";
import Api from "api";
import { signinCompleted, setError, loadingChanged, createEmptyOrder, loadMenuDetailsCompleted } from "actions";
import { SIGNIN_REQUESTED } from "actions/types";
import localforage from "localforage";
import history from "./../history";

const saveToken = token =>
  localforage.setItem("token", token).catch(err => console.log("Error saving token data in local storage", err));

function* loadMenuDetails() {
  const api = new Api();
  const menuDetails = yield call(api.getMenuDetails);
  yield put(loadMenuDetailsCompleted(menuDetails));
  return menuDetails;
}

function* signin(action) {
  try {
    yield put(loadingChanged(true, "Login in corso..."));
    const api = new Api();
    const userData = yield call(api.signin, action.payload);
    yield saveToken(userData.token.value);
    yield put(loadingChanged(true, "Caricamento menu..."));
    const menuDetails = yield loadMenuDetails();
    yield put(createEmptyOrder(menuDetails));
    yield put(signinCompleted(userData.user));
    history.push("/order/new");
  } catch (e) {
    yield put(setError(e.message));
  } finally {
    yield put(loadingChanged(false));
  }
}

function* signinSaga() {
  yield takeLatest(SIGNIN_REQUESTED, signin);
}

export default signinSaga;
