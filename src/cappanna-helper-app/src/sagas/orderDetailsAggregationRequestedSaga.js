import { call, put, takeLatest } from "redux-saga/effects";
import Api from "api";
import { loadingChanged, signalApiSuccess, signalApiError, orderDetailsAggregationCompleted } from "actions";
import { ORDER_DETAILS_AGGREGATION_REQUESTED } from "actions/types";

function* orderDetailsAggregationRequestedSaga(action) {
    try {
        yield put(loadingChanged(true, "Calcolo in corso..."));

        const api = new Api();
        const aggregate = yield call(api.aggregateOrderDetails, action.payload);
        yield put(orderDetailsAggregationCompleted(aggregate));
        yield put(signalApiSuccess());
    } catch (e) {
        yield put(signalApiError(e));
    } finally {
        yield put(loadingChanged(false));
    }
}

function* orderDetailsAggregationRequestedSagaSaga() {
    yield takeLatest(ORDER_DETAILS_AGGREGATION_REQUESTED, orderDetailsAggregationRequestedSaga);
}

export default orderDetailsAggregationRequestedSagaSaga;
