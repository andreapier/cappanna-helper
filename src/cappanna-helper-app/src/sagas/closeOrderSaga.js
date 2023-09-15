import { call, put, takeLatest } from "redux-saga/effects";
import Api from "api";
import { loadingChanged, resetOrder, signalApiError, signalApiSuccess } from "actions";
import { CLOSE_ORDER } from "actions/types";
import history from "../chHistory";

function* closeOrder(action) {
    try {
        yield put(loadingChanged(true, "Chiusura ordine in corso..."));
        const api = new Api();
        yield call(api.closeOrder, action.payload);
        yield put(resetOrder());
        yield put(signalApiSuccess());
        history.navigate(`/order`);
    } catch (e) {
        yield put(signalApiError(e));
    } finally {
        yield put(loadingChanged(false));
    }
}

function* closeOrderSaga() {
    yield takeLatest(CLOSE_ORDER, closeOrder);
}

export default closeOrderSaga;
