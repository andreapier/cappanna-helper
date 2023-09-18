import { put, takeLatest, call } from "redux-saga/effects";
import { loadingChanged, signalApiError, loadStandsListCompleted } from "actions";
import { LOAD_STANDS_LIST_REQUESTED } from "actions/types";
import Api from "api";

function* loadStandsList(action) {
    try {
        yield put(loadingChanged(true, "Caricamento stand..."));
        const api = new Api();
        const settings = yield call(api.getStands);
        yield put(loadStandsListCompleted(settings));
    } catch (e) {
        yield put(signalApiError(e));
    } finally {
        yield put(loadingChanged(false));
    }
}

function* loadStandsListSaga() {
    yield takeLatest(LOAD_STANDS_LIST_REQUESTED, loadStandsList);
}

export default loadStandsListSaga;
