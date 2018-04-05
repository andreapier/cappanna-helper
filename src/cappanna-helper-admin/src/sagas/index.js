import { all } from "redux-saga/effects";
import signinSaga from "./signinSaga";
import signoutSaga from "./signoutSaga";

function* rootSaga() {
  yield all([
    signinSaga(),
    signoutSaga()
  ]);
}

export default rootSaga;