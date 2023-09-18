import { all } from "redux-saga/effects";
import signinSaga from "./signinSaga";
import signoutSaga from "./signoutSaga";
import signupSaga from "./signupSaga";
import loadUserDataSaga from "./loadUserDataSaga";
import confirmOrderSaga from "./confirmOrderSaga";
import orderChangedSaga from "./orderChangedSaga";
import deleteOrderSaga from "./deleteOrderSaga";
import closeOrderSaga from "./closeOrderSaga";
import loadOrdersListSaga from "./loadOrdersListSaga";
import loadSelectedOrderSaga from "./loadSelectedOrderSaga";
import printOrderSaga from "./printOrderSaga";
import loadMenuDetailsSaga from "./loadMenuDetailsSaga";
import editMenuDetailSaga from "./editMenuDetailSaga";
import menuDetailsChangedSaga from "./menuDetailsChangedSaga";
import signalApiErrorSaga from "./signalApiErrorSaga";
import signalApiSuccessSaga from "./signalApiSuccessSaga";
import loadNotificationsListSaga from "./loadNotificationsListSaga";
import loadDashboardDataSaga from "./loadDashboardDataSaga";
import orderDetailsAggregationRequestedSaga from "./orderDetailsAggregationRequestedSaga";
import loadSettingsListSaga from "./loadSettingsListSaga";
import setSettingSaga from "./setSettingSaga";
import loadStandsListSaga from "./loadStandsListSaga";
import loadUsersListSaga from "./loadUsersListSaga";

function* rootSaga() {
    yield all([
        signinSaga(),
        signoutSaga(),
        signupSaga(),
        loadUserDataSaga(),
        loadOrdersListSaga(),
        confirmOrderSaga(),
        orderChangedSaga(),
        deleteOrderSaga(),
        closeOrderSaga(),
        loadSelectedOrderSaga(),
        printOrderSaga(),
        loadMenuDetailsSaga(),
        editMenuDetailSaga(),
        menuDetailsChangedSaga(),
        signalApiErrorSaga(),
        signalApiSuccessSaga(),
        loadNotificationsListSaga(),
        loadDashboardDataSaga(),
        orderDetailsAggregationRequestedSaga(),
        loadSettingsListSaga(),
        setSettingSaga(),
        loadStandsListSaga(),
        loadUsersListSaga()
    ]);
}

export default rootSaga;
