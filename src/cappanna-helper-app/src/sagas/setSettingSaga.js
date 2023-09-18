import { select, call, put, takeLatest } from "redux-saga/effects";
import Api from "api";
import { loadingChanged, signalApiError, signalApiSuccess } from "actions";
import { SET_SETTING_VALUE } from "actions/types";

function* setSetting(action) {
    try {
        yield put(loadingChanged(true, "Salvataggio in corso..."));

        const state = yield select();
        const setting = {
            ...state.settings.find((e) => e.id === action.payload.settingId)
        };
        setting.value = action.payload.settingValue;
        const api = new Api();
        yield call(api.saveSetting, setting);
        yield put(signalApiSuccess());
    } catch (e) {
        yield put(signalApiError(e));
    } finally {
        yield put(loadingChanged(false));
    }
}

function* setSettingSaga() {
    yield takeLatest(SET_SETTING_VALUE, setSetting);
}

export default setSettingSaga;
