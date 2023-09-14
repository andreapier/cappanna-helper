import { put, takeLatest, call } from "redux-saga/effects";
import { loadingChanged, signalApiError, loadDashboardDataCompleted } from "actions";
import { LOAD_DASHBOARD_DATA_REQUESTED } from "actions/types";
import Api from "api";

function* loadDashboardData(action) {
    try {
        yield put(loadingChanged(true, "Caricamento dati..."));
        const api = new Api();
        const orders = yield call(api.getDashboardData);
        yield put(loadDashboardDataCompleted(orders));
    } catch (e) {
        yield put(signalApiError(e));
    } finally {
        yield put(loadingChanged(false));
    }
}

function* loadDashboardDataSaga() {
    yield takeLatest(LOAD_DASHBOARD_DATA_REQUESTED, loadDashboardData);
}

export default loadDashboardDataSaga;
