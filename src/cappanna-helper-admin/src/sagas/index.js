import { all } from "redux-saga/effects";
import loginSaga from "./loginSaga";
import logoutSaga from "./logoutSaga";

function* rootSaga() {
  yield all([
    loginSaga(),
    logoutSaga()
  ]);
}

export default rootSaga;