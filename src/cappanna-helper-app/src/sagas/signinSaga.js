import { call, put, takeLatest } from "redux-saga/effects";
import Api from "api";
import {
    signinCompleted,
    setError,
    loadingChanged,
    loadMenuDetailsRequested
} from "actions";
import { SIGNIN_REQUESTED } from "actions/types";
import localforage from "localforage";
import history from "./../history";

const saveUserData = userData =>
    localforage
        .setItem("userData", userData)
        .catch(err =>
            console.log("Error saving user data in local storage", err)
        );

function* signin(action) {
  try {
    yield put(loadingChanged(true, "Login in corso..."));
    const api = new Api();
    const userData = yield call(api.signin, action.payload);
    yield saveUserData(userData);
    yield put(loadingChanged(true, "Caricamento menu..."));
    const menuDetails = yield loadMenuDetails();
    yield put(createEmptyOrder(menuDetails));
    yield put(signinCompleted(userData));
    yield put(connectSignalR(userData));
    history.push("/order/new");
  } catch (e) {
    console.error(e);
    yield put(setError(e.message));
  } finally {
    yield put(loadingChanged(false));
  }
}

function* signinSaga() {
    yield takeLatest(SIGNIN_REQUESTED, signin);
}

export default signinSaga;
