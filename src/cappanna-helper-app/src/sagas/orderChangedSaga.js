import { select, takeLatest, put } from "redux-saga/effects";
import { ORDER_CHANGED, ORDER_PRINTED, ORDER_DELETED, ORDER_CLOSED } from "actions/types";
import history from "../chHistory";
import { notifyWarning, resetOrder } from "actions";

function* orderChanged(action) {
    const state = yield select();

    if (state.newOrderHeader.id === action.payload.id) {
        if (action.type === ORDER_DELETED) {
            yield put(notifyWarning("L'ordine è stato cancellato, ricrearlo se necessario"));
            history.navigate("/order/new");
        } else if (action.type === ORDER_CLOSED) {
            yield put(notifyWarning("L'ordine è stato chiuso, non è più possibile modificarlo"));
            history.navigate(`/order/${action.payload.id}`);
        } else {
            yield put(notifyWarning("L'ordine è cambiato, ripetere le modifiche"));
            history.navigate(`/order/${action.payload.id}`);
        }

        yield put(resetOrder());
    }
}

function* orderChangedSaga() {
    yield takeLatest([ORDER_CHANGED, ORDER_PRINTED, ORDER_DELETED, ORDER_CLOSED], orderChanged);
}

export default orderChangedSaga;
