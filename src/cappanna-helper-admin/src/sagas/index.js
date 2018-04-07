import { all } from "redux-saga/effects";
import signinSaga from "./signinSaga";
import signoutSaga from "./signoutSaga";
import loadUserDataSaga from './loadUserDataSaga';
import signupSaga from "./signupSaga";

function* rootSaga() {
  yield all([
    signinSaga(),
    signoutSaga(),
    loadUserDataSaga(),
    signupSaga()
  ]);
}

export default rootSaga;