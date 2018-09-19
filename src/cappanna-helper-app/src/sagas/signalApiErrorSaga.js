import { put, takeLatest } from "redux-saga/effects";
import { notifyError, signoutRequested } from "actions";
import { SIGNAL_API_ERROR } from "actions/types";

function* signalApiError(action) {
  const error = action.payload;
  if (error.response && error.response.status === 401) {
    yield put(signoutRequested());
  } else {
    console.error('API ERROR', error);
    yield put(notifyError(error.message));
  }
}

function* signalApiErrorSaga() {
  yield takeLatest(SIGNAL_API_ERROR, signalApiError);
}

export default signalApiErrorSaga;
