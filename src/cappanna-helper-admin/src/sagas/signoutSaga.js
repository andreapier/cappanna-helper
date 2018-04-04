import { call, put, takeLatest } from "redux-saga/effects";
import Api from "./../api/Api";
import { signoutCompleted, errorOccurred, loadingChanged } from "./../actions";
import { SIGNOUT_REQUESTED } from "./../actions/types";
import history from "./../history";


function* signout(action) {
  try {
    yield put(loadingChanged(true, "Uscita in corso..."));
    const api = new Api();
    yield call(api.signout);
  } catch (e) {
    yield put(errorOccurred(e.message));
  }

  try {
    yield put(signoutCompleted());
  } catch (e) {
    yield put(errorOccurred(e.message));
  }

  history.push("/");
  yield put(loadingChanged(false));
}

function* signoutSaga() {
  yield takeLatest(SIGNOUT_REQUESTED, signout);
}

export default signoutSaga;
