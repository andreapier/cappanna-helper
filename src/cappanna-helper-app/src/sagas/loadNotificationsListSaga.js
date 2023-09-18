import { put, takeLatest, call } from "redux-saga/effects";
import { loadingChanged, signalApiError, loadNotificationsListCompleted } from "actions";
import { LOAD_NOTIFICATIONS_LIST_REQUESTED } from "actions/types";
import Api from "api";
import history from "../chHistory";

function* loadNotificationsList(action) {
    try {
        yield put(loadingChanged(true, "Caricamento notifiche..."));
        const api = new Api();
        const notifications = yield call(api.getNotifications);
        yield put(loadNotificationsListCompleted(notifications));
        history.navigate("/notifications");
    } catch (e) {
        yield put(signalApiError(e));
    } finally {
        yield put(loadingChanged(false));
    }
}

function* loadNotificationsListSaga() {
    yield takeLatest(LOAD_NOTIFICATIONS_LIST_REQUESTED, loadNotificationsList);
}

export default loadNotificationsListSaga;
