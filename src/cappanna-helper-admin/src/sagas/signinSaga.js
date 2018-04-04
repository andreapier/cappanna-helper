import { call, put, takeLatest } from "redux-saga/effects";
import Api from "./../api/Api";
import {
  signinCompleted,
  errorOccurred,
  loadingChanged
} from "./../actions";
import { SIGNIN_REQUESTED } from "./../actions/types";
import history from "./../history";
import localforage from 'localforage';

const saveUser = user => localforage.setItem('user', user);

function* signin(action) {
  try {
    console.log('saga', action);
    yield put(loadingChanged(true, "Accesso in corso..."));
    const api = new Api();
    const userData = yield call(api.signin, action.payload);
    yield put(saveUser(userData));
    yield put(signinCompleted(userData));
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
