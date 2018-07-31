import { put, takeLatest } from "redux-saga/effects";
import { setError, signoutRequested } from "actions";
import { SIGNAL_API_ERROR } from "actions/types";

function* signalApiError(error) {
  if (error.response && error.response.status === 401) {
    yield put(signoutRequested());
  } else {
    console.error(error);
    yield put(setError(error.message));
  }
}

function* signalApiErrorSaga() {
  yield takeLatest(SIGNAL_API_ERROR, signalApiError);
}

export default signalApiErrorSaga;
