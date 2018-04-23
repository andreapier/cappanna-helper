import { call, put, takeLatest } from "redux-saga/effects";
import Api from "api/";
import { signoutCompleted, setError, loadingChanged } from "actions";
import { SIGNOUT_REQUESTED } from "actions/types";
import localforage from "localforage";
import history from "./../history";

const deleteToken = () =>
  localforage.removeItem("token").catch(err => console.log("Error removing token from local storage", err));

function* signout(action) {
  try {
    yield put(loadingChanged(true, "Logout in corso..."));
    const api = new Api();
    yield call(api.signout);
  } catch (e) {
    yield put(setError(e.message));
  }

  try {
    yield deleteToken();
    yield put(signoutCompleted());
  } catch (e) {
    yield put(setError(e.message));
  }

  history.push("/");
  yield put(loadingChanged(false));
}

function* signoutSaga() {
  yield takeLatest(SIGNOUT_REQUESTED, signout);
}

export default signoutSaga;
