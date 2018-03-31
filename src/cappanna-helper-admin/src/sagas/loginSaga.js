import { call, put, takeLatest } from "redux-saga/effects";
import Api from "./../api/Api";
import {
  loginCompleted,
  errorOccurred,
  loadingChanged
} from "./../actions";
import { LOGIN_REQUESTED } from "./../actions/types";
import history from "./../history";

function* login(action) {
  try {
    yield put(loadingChanged(true, "Login in corso..."));
    const api = new Api();
    const userData = yield call(api.login, action.payload);
    yield put(loginCompleted(userData.user));
    history.push("/dashboard");
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
