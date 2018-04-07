import { call, put, takeLatest } from "redux-saga/effects";
import Api from "api/Api";
import {
  signupCompleted,
  setError,
  loadingChanged
} from "actions";
import { SIGNUP_REQUESTED } from "actions/types";

function* signup(action) {
  try {
    yield put(loadingChanged(true, "Registrazione in corso..."));
    const api = new Api();
    const userData = yield call(api.signup, action.payload);
    yield put(signupCompleted(userData));
  } catch (e) {
    yield put(setError(e.message));
  } finally {
    yield put(loadingChanged(false));
  }
}

function* signupSaga() {
  yield takeLatest(SIGNUP_REQUESTED, signup);
}

export default signupSaga;