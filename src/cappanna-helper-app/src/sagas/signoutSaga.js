import { call, put, takeLatest } from "redux-saga/effects";
import Api from "api/";
import {
  signoutCompleted,
  setError,
  loadingChanged,
  disconnectSignalR
} from "actions";
import { SIGNOUT_REQUESTED } from "actions/types";
import localforage from "localforage";
import history from "./../history";

const deleteUserData = () =>
  localforage
    .removeItem("userData")
    .catch(err =>
      console.log("Error removing user data from local storage", err)
    );

function* signout(action) {
  try {
    yield put(loadingChanged(true, "Logout in corso..."));
    yield deleteUserData();
    yield put(disconnectSignalR());
    const api = new Api();
    yield call(api.signout);
  } catch (e) {
    console.error(e);
    yield put(setError(e.message));
  }

  yield put(signoutCompleted());
  history.push("/");
  yield put(loadingChanged(false));
}

function* signoutSaga() {
  yield takeLatest(SIGNOUT_REQUESTED, signout);
}

export default signoutSaga;
