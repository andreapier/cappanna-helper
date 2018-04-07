import { call, put, takeLatest } from "redux-saga/effects";
import Api from "api/Api";
import {
  signinCompleted,
  setError,
  loadingChanged
} from "actions";
import { SIGNIN_REQUESTED } from "actions/types";
import history from "./../history";
import localforage from 'localforage';
import { reset } from 'redux-form';

const saveUser = user => localforage.setItem('user', user);

function* signin(action) {
  try {
    yield put(loadingChanged(true, "Accesso in corso..."));
    const api = new Api();
    const userData = yield call(api.signin, action.payload);
    yield saveUser(userData);
    yield put(signinCompleted(userData));
    history.push("/dashboard");
    reset('signinForm');
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
