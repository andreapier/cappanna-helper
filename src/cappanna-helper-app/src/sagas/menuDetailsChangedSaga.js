import { select, takeLatest, put } from "redux-saga/effects";
import { MENU_DETAILS_CHANGED } from "actions/types";
import { notifyInfo, notifyWarning, notifyError } from "actions";

const buildMessage = (menuDetail, state) => {
    if (menuDetail.unitsInStock === null || menuDetail.unitsInStock === undefined) {
        return {
            type: "info",
            message: `Il piatto '${menuDetail.name}' è di nuovo disponibile.`
        };
    }

    if (menuDetail.unitsInStock === 0) {
        const item = state.newOrderDetails.find((e) => e.itemId === menuDetail.id);

        if (state.newOrderHeader.id > 0 && item.quantity > 0) {
            return {
                type: "warning",
                message: `Il piatto '${menuDetail.name}' non è più disponibile. Rimuoverlo dall'ordine.`
            };
        }

        return {
            type: "warning",
            message: `Il piatto '${menuDetail.name}' non è più disponibile.`
        };
    }

    return {
        type: "warning",
        message: `Rimangono solo ${menuDetail.unitsInStock} porzioni del piatto '${menuDetail.name}'.`
    };
};

function* menuDetailsChanged(action) {
    const state = yield select();
    const messages = action.payload.map((e) => buildMessage(e, state));

    if (messages.every((e) => e.type === "info")) {
        yield put(notifyInfo(messages.map((m) => m.message).join("\n")));
    } else if (messages.every((e) => e.type === "warning")) {
        yield put(notifyWarning(messages.map((m) => m.message).join("\n")));
    } else if (messages.every((e) => e.type === "error")) {
        yield put(notifyError(messages.map((m) => m.message).join("\n")));
    }
}

function* menuDetailsChangedSaga() {
    yield takeLatest(MENU_DETAILS_CHANGED, menuDetailsChanged);
}

export default menuDetailsChangedSaga;
