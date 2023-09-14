import { put, takeLatest, call } from "redux-saga/effects";
import { loadingChanged, loadMenuDetailsCompleted, signalApiError } from "actions";
import { LOAD_MENU_DETAILS_REQUESTED } from "actions/types";
import Api from "api";

function* loadMenuDetails() {
    try {
        yield put(loadingChanged(true, "Caricamento menu..."));
        const api = new Api();
        const menuDetails = yield call(api.getMenuDetails);
        yield put(loadMenuDetailsCompleted(menuDetails));
    } catch (e) {
        yield put(signalApiError(e));
    } finally {
        yield put(loadingChanged(false));
    }
}

function* loadMenuDetailsSaga() {
    yield takeLatest(LOAD_MENU_DETAILS_REQUESTED, loadMenuDetails);
}

export default loadMenuDetailsSaga;
