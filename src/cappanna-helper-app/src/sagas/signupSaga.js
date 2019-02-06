import { call, put, takeLatest } from "redux-saga/effects";
import Api from "api";
import { signupCompleted, signalApiError, loadingChanged } from "actions";
import { SIGNUP_REQUESTED } from "actions/types";
import history from "./../history";

function* signup(action) {
  try {
    yield put(loadingChanged(true, "Registrazione in corso..."));
    const api = new Api();
    const userData = yield call(api.signup, action.payload);
    yield put(signupCompleted(userData));
    history.push("/users/signup/ok");
  } catch (e) {
    yield put(signalApiError(e));
  } finally {
    yield put(loadingChanged(false));
  }
}

function* signupSaga() {
  yield takeLatest(SIGNUP_REQUESTED, signup);
}

export default signupSaga;
