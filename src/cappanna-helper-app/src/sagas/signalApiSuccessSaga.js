import { put, takeLatest } from "redux-saga/effects";
import { notifyInfo } from "actions";
import { SIGNAL_API_SUCCESS } from "actions/types";

function* signalApiSuccess() {
    yield put(notifyInfo("Operazione conclusa con successo"));
}

function* signalApiSuccessSaga() {
    yield takeLatest(SIGNAL_API_SUCCESS, signalApiSuccess);
}

export default signalApiSuccessSaga;
