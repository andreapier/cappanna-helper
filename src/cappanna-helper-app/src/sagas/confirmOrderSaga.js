import { call, put, takeLatest } from "redux-saga/effects";
import Api from "api";
import { loadingChanged, signalApiError, resetOrder, signalApiSuccess } from "actions";
import { CONFIRM_ORDER } from "actions/types";
import history from "../chHistory";

function* confirmOrder(action) {
    try {
        yield put(loadingChanged(true, "Ordine in corso..."));

        const api = new Api();
        const order = yield call(action.payload.id > 0 ? api.editOrder : api.createOrder, action.payload);
        yield put(signalApiSuccess());
        yield put(resetOrder());
        history.navigate(`/order/${order.id}`);
    } catch (e) {
        yield put(signalApiError(e));
    } finally {
        yield put(loadingChanged(false));
    }
}

function* confirmOrderSaga() {
    yield takeLatest(CONFIRM_ORDER, confirmOrder);
}

export default confirmOrderSaga;
