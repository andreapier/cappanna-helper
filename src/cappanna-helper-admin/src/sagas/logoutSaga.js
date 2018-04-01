import { call, put, takeLatest } from "redux-saga/effects";
import Api from "./../api/Api";
import { logoutCompleted, errorOccurred, loadingChanged } from "./../actions";
import { LOGOUT_REQUESTED } from "./../actions/types";
import history from "./../history";


function* logout(action) {
  try {
    yield put(loadingChanged(true, "Logout in corso..."));
    const api = new Api();
    yield call(api.logout);
  } catch (e) {
    yield put(errorOccurred(e.message));
  }

  try {
    yield put(logoutCompleted());
  } catch (e) {
    yield put(errorOccurred(e.message));
  }

  history.push("/");
  yield put(loadingChanged(false));
}

function* logoutSaga() {
  yield takeLatest(LOGOUT_REQUESTED, logout);
}

export default logoutSaga;