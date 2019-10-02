import {
  SIGNIN_REQUESTED,
  SIGNIN_COMPLETED,
  SIGNOUT_REQUESTED,
  SIGNOUT_COMPLETED,
  SIGNUP_REQUESTED,
  SIGNUP_COMPLETED,
  LOAD_USER_DATA,
  LOADING_CHANGED,
  SIGNAL_API_ERROR,
  SIGNAL_API_SUCCESS,
  NOTIFY_INFO,
  NOTIFY_WARNING,
  NOTIFY_ERROR,
  RESET_NOTIFICATION,
  LOAD_MENU_DETAILS_REQUESTED,
  LOAD_MENU_DETAILS_COMPLETED,
  SET_MENU_DETAIL_QUANTITY,
  MENU_DETAILS_CHANGED,
  EDIT_ORDER,
  DELETE_ORDER,
  CLOSE_ORDER,
  RESET_ORDER,
  CONFIRM_ORDER,
  ORDER_CREATED,
  ORDER_CHANGED,
  ORDER_PRINTED,
  ORDER_DELETED,
  ORDER_CLOSED,
  SET_ORDER_TABLE,
  SET_ORDER_SEATS,
  SET_ORDER_NOTES,
  INCREMENT_ORDER_DETAIL_QUANTITY,
  LOAD_ORDERS_LIST_REQUESTED,
  LOAD_ORDERS_LIST_COMPLETED,
  TOGGLE_ORDERS_LIST_FILTER_BY_USER,
  TOGGLE_ORDERS_LIST_FILTER_BY_STAND,
  TOGGLE_ORDERS_LIST_FILTER_BY_STATUS,
  RESET_ORDER_SELECTION_FOR_AGGREGATION,
  TOGGLE_ORDER_SELECTION_FOR_AGGREGATION,
  ORDER_DETAILS_AGGREGATION_REQUESTED,
  ORDER_DETAILS_AGGREGATION_COMPLETED,
  LOAD_SELECTED_ORDER_REQUESTED,
  LOAD_SELECTED_ORDER_COMPLETED,
  PRINT_REQUESTED,
  PRINT_COMPLETED,
  LOAD_NOTIFICATIONS_LIST_REQUESTED,
  LOAD_NOTIFICATIONS_LIST_COMPLETED,
  CALCULATE,
  LOAD_DASHBOARD_DATA_REQUESTED,
  LOAD_DASHBOARD_DATA_COMPLETED,
  LOAD_SETTINGS_LIST_REQUESTED,
  LOAD_SETTINGS_LIST_COMPLETED,
  SET_SETTING_VALUE,
  LOAD_STANDS_LIST_REQUESTED,
  LOAD_STANDS_LIST_COMPLETED,
  LOAD_USERS_LIST_REQUESTED,
  LOAD_USERS_LIST_COMPLETED
} from "actions/types";

export function signinRequested({ username, password, rememberMe }) {
  return {
    type: SIGNIN_REQUESTED,
    payload: { username, password, rememberMe }
  };
}

export function signinCompleted(userData) {
  return { type: SIGNIN_COMPLETED, payload: userData };
}

export function signoutRequested() {
  return { type: SIGNOUT_REQUESTED };
}

export function signoutCompleted() {
  return { type: SIGNOUT_COMPLETED };
}

export function signupRequested(payload) {
  return {
    type: SIGNUP_REQUESTED,
    payload
  };
}

export function signupCompleted() {
  return { type: SIGNUP_COMPLETED };
}

export function loadUserData() {
  return { type: LOAD_USER_DATA };
}

export function loadingChanged(loading, message = "") {
  return { type: LOADING_CHANGED, payload: { loading, message } };
}

export function signalApiError(error) {
  return { type: SIGNAL_API_ERROR, payload: error };
}

export function signalApiSuccess() {
  return { type: SIGNAL_API_SUCCESS };
}

export function notifyInfo(message) {
  return { type: NOTIFY_INFO, payload: message };
}

export function notifyWarning(message) {
  return { type: NOTIFY_WARNING, payload: message };
}

export function notifyError(message) {
  return { type: NOTIFY_ERROR, payload: message };
}

export function resetNotification() {
  return { type: RESET_NOTIFICATION };
}

export function loadMenuDetailsRequested() {
  return { type: LOAD_MENU_DETAILS_REQUESTED };
}

export function loadMenuDetailsCompleted(menuDetails) {
  return { type: LOAD_MENU_DETAILS_COMPLETED, payload: menuDetails };
}

export function setMenuDetailQuantity(dishId, unitsInStock) {
  return { type: SET_MENU_DETAIL_QUANTITY, payload: { dishId, unitsInStock } };
}

export function menuDetailsChanged(menuDetails) {
  return { type: MENU_DETAILS_CHANGED, payload: menuDetails };
}

export function editOrder(order) {
  return { type: EDIT_ORDER, payload: order };
}

export function deleteOrder(orderId) {
  return { type: DELETE_ORDER, payload: orderId };
}

export function closeOrder(orderId) {
  return { type: CLOSE_ORDER, payload: orderId };
}

export function resetOrder() {
  return { type: RESET_ORDER };
}

export function confirmOrder(order) {
  return { type: CONFIRM_ORDER, payload: order };
}

export function orderCreated(order) {
  return { type: ORDER_CREATED, payload: order };
}

export function orderChanged(order) {
  return { type: ORDER_CHANGED, payload: order };
}

export function orderPrinted(order) {
  return { type: ORDER_PRINTED, payload: order };
}

export function orderDeleted(order) {
  return { type: ORDER_DELETED, payload: order };
}

export function orderClosed(order) {
  return { type: ORDER_CLOSED, payload: order };
}

export function setOrderTable(table) {
  return { type: SET_ORDER_TABLE, payload: table };
}

export function setOrderSeats(seats) {
  return { type: SET_ORDER_SEATS, payload: seats };
}

export function setOrderNotes(notes) {
  return { type: SET_ORDER_NOTES, payload: notes };
}

export function incrementOrderDetailQuantity(itemId, quantity, price) {
  return {
    type: INCREMENT_ORDER_DETAIL_QUANTITY,
    payload: { itemId, quantity, price }
  };
}

export function loadOrdersListRequested() {
  return { type: LOAD_ORDERS_LIST_REQUESTED };
}

export function loadOrdersListCompleted(orders) {
  return { type: LOAD_ORDERS_LIST_COMPLETED, payload: orders };
}

export function toggleOrdersListFilterByUser() {
  return { type: TOGGLE_ORDERS_LIST_FILTER_BY_USER };
}

export function toggleOrdersListFilterByStand() {
  return { type: TOGGLE_ORDERS_LIST_FILTER_BY_STAND };
}

export function toggleOrdersListFilterByStatus() {
  return { type: TOGGLE_ORDERS_LIST_FILTER_BY_STATUS };
}

export function resetOrderSelectionForAggregation() {
  return { type: RESET_ORDER_SELECTION_FOR_AGGREGATION };
}

export function toggleOrderSelectionForAggregation(orderId) {
  return { type: TOGGLE_ORDER_SELECTION_FOR_AGGREGATION, payload: orderId };
}

export function orderDetailsAggregationRequested(ordersId) {
  return { type: ORDER_DETAILS_AGGREGATION_REQUESTED, payload: ordersId };
}

export function orderDetailsAggregationCompleted(aggregation) {
  return { type: ORDER_DETAILS_AGGREGATION_COMPLETED, payload: aggregation };
}

export function loadSelectedOrderRequested(orderId) {
  return { type: LOAD_SELECTED_ORDER_REQUESTED, payload: orderId };
}

export function loadSelectedOrderCompleted(order) {
  return { type: LOAD_SELECTED_ORDER_COMPLETED, payload: order };
}

export function printRequested(orderId) {
  return { type: PRINT_REQUESTED, payload: orderId };
}

export function printCompleted() {
  return { type: PRINT_COMPLETED };
}

export function loadNotificationsListRequested() {
  return { type: LOAD_NOTIFICATIONS_LIST_REQUESTED };
}

export function loadNotificationsListCompleted(notifications) {
  return { type: LOAD_NOTIFICATIONS_LIST_COMPLETED, payload: notifications };
}

export function calculate({ amount, paidAmount, seats }) {
  return { type: CALCULATE, payload: { amount, paidAmount, seats } };
}

export function loadDashboardDataRequested() {
  return { type: LOAD_DASHBOARD_DATA_REQUESTED };
}

export function loadDashboardDataCompleted(notifications) {
  return { type: LOAD_DASHBOARD_DATA_COMPLETED, payload: notifications };
}

export function loadSettingsListRequested() {
  return { type: LOAD_SETTINGS_LIST_REQUESTED };
}

export function loadSettingsListCompleted(settings) {
  return { type: LOAD_SETTINGS_LIST_COMPLETED, payload: settings };
}

export function setSettingValue(settingId, settingValue) {
  return { type: SET_SETTING_VALUE, payload: { settingId, settingValue } };
}

export function loadStandsListRequested() {
  return { type: LOAD_STANDS_LIST_REQUESTED };
}

export function loadStandsListCompleted(stands) {
  return { type: LOAD_STANDS_LIST_COMPLETED, payload: stands };
}

export function loadUsersListRequested() {
  return { type: LOAD_USERS_LIST_REQUESTED };
}

export function loadUsersListCompleted(stands) {
  return { type: LOAD_USERS_LIST_COMPLETED, payload: stands };
}
