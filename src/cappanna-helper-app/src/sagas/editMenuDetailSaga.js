import { select, call, put, takeLatest } from "redux-saga/effects";
import Api from "api";
import {
  loadingChanged,
  signalApiError,
  signalApiSuccess
} from "actions";
import { SET_MENU_DETAIL_QUANTITY } from "actions/types";

function* editMenuDetail(action) {
  try {
    const state = yield select();
    yield put(loadingChanged(true, "Salvataggio in corso..."));

    const menuDetail = {
      ...state.menuDetails.find(e => e.id === action.payload.dishId),
      unitsInStock: action.payload.unitsInStock < 0 ? 0 : action.payload.unitsInStock
    };
    const api = new Api();
    yield call(api.editMenuDetail, menuDetail);
    yield put(signalApiSuccess());
  } catch (e) {
    yield put(signalApiError(e));
  } finally {
    yield put(loadingChanged(false));
  }
}

function* editMenuDetailSaga() {
  yield takeLatest(SET_MENU_DETAIL_QUANTITY, editMenuDetail);
}

export default editMenuDetailSaga;
