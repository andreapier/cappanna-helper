import { select, call, put, takeLatest } from "redux-saga/effects";
import Api from "api";
import {
  loadingChanged,
  signalApiError
} from "actions";
import { SET_SETTING_VALUE } from "actions/types";

function* setSetting(action) {
  try {
    yield put(loadingChanged(true, "Salvataggio in corso..."));

    const state = yield select();
    console.log(state.settings.items[0])
    const setting = {
      ...state.settings.items.find(e => e.id === action.payload.settingId)
    };
    setting.value = action.payload.settingValue;
    const api = new Api();
    yield call(api.saveSetting, setting);
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
