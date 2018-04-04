import { call, put, takeLatest } from "redux-saga/effects";
import Api from "./../api/Api";
import {
  signinCompleted,
  errorOccurred,
  loadingChanged
} from "./../actions";
import { SIGNIN_REQUESTED } from "./../actions/types";
import history from "./../history";

function* signin(action) {
  try {
    yield put(loadingChanged(true, "Accesso in corso..."));
    const api = new Api();
    const userData = yield call(api.signin, action.payload);
    yield put(signinCompleted(userData.user));
    history.push("/dashboard");
  } catch (e) {
    yield put(errorOccurred(e.message));
  } finally {
    yield put(loadingChanged(false));
  }
}

function* signinSaga() {
  yield takeLatest(SIGNIN_REQUESTED, signin);
}

export default signinSaga;
