import { put, takeLatest, call } from "redux-saga/effects";
import { loadingChanged, signalApiError, loadSettingsListCompleted } from "actions";
import { LOAD_SETTINGS_LIST_REQUESTED } from "actions/types";
import Api from "api";

function* loadSettingsList(action) {
    try {
        yield put(loadingChanged(true, "Caricamento impostazioni..."));
        const api = new Api();
        const settings = yield call(api.getSettings);
        yield put(loadSettingsListCompleted(settings));
    } catch (e) {
        yield put(signalApiError(e));
    } finally {
        yield put(loadingChanged(false));
    }
}

function* loadSettingsListSaga() {
    yield takeLatest(LOAD_SETTINGS_LIST_REQUESTED, loadSettingsList);
}

export default loadSettingsListSaga;
