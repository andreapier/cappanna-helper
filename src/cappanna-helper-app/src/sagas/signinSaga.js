import { call, put, takeLatest } from "redux-saga/effects";
import Api from "api";
import {
  signinCompleted,
  signalApiError,
  loadingChanged,
  loadMenuDetailsRequested,
  connectSignalR
} from "actions";
import { SIGNIN_REQUESTED } from "actions/types";
import localforage from "localforage";
import history from "./../history";
import { getDefaultRoute } from "routes/helpers";

const saveUserData = userData =>
  localforage
    .setItem("userData", userData)
    .catch(err => console.error("Error saving user data in local storage", err));

function* signin(action) {
  try {
    yield put(loadingChanged(true, "Login in corso..."));
    const api = new Api();
    const userData = yield call(api.signin, action.payload);

    if (action.payload.rememberMe) {
      yield saveUserData(userData);
    }
    
    yield put(loadingChanged(true, "Caricamento menu..."));
    yield put(loadMenuDetailsRequested());
    yield put(signinCompleted(userData));
    yield put(connectSignalR(userData));
    
    const route = getDefaultRoute(userData.roles[0]);
    history.push(route);
  } catch (e) {
    yield put(signalApiError(e));
  } finally {
    yield put(loadingChanged(false));
  }
}

function* signinSaga() {
  yield takeLatest(SIGNIN_REQUESTED, signin);
}

export default signinSaga;
