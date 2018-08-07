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
  NOTIFY_INFO,
  NOTIFY_WARNING,
  NOTIFY_ERROR,
  RESET_NOTIFICATION,
  LOAD_MENU_DETAILS_REQUESTED,
  LOAD_MENU_DETAILS_COMPLETED,
  CONNECT_SIGNALR,
  DISCONNECT_SIGNALR,
  CREATE_EMPTY_ORDER,
  EDIT_ORDER,
  RESET_ORDER,
  CONFIRM_ORDER,
  ORDER_CREATED,
  ORDER_CHANGED,
  ORDER_PRINTED,
  SET_ORDER_TABLE,
  SET_ORDER_TABLE_CATEGORY,
  SET_ORDER_SEATS,
  SET_ORDER_NOTES,
  INCREMENT_ORDER_DETAIL_QUANTITY,
  LOAD_ORDERS_LIST_REQUESTED,
  LOAD_ORDERS_LIST_COMPLETED,
  INVALIDATE_ORDERS_LIST,
  TOGGLE_ORDERS_LIST_FILTER,
  LOAD_SELECTED_ORDER_REQUESTED,
  LOAD_SELECTED_ORDER_COMPLETED,
  INVALIDATE_SELECTED_ORDER,
  PRINT_REQUESTED,
  PRINT_COMPLETED
} from "actions/types";

const signalRAction = {
  metadata: {
    signalR: true
  }
};

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

export function signupRequested({
  username,
  password,
  confirmPassword,
  firstName,
  lastName
}) {
  return {
    type: SIGNUP_REQUESTED,
    payload: { username, password, confirmPassword, firstName, lastName }
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

export function connectSignalR(userData) {
  return { type: CONNECT_SIGNALR, payload: userData, ...signalRAction };
}

export function disconnectSignalR() {
  return { type: DISCONNECT_SIGNALR, ...signalRAction };
}

export function createEmptyOrder(menu) {
  return { type: CREATE_EMPTY_ORDER, payload: menu };
}

export function editOrder(order) {
  return { type: EDIT_ORDER, payload: order };
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

export function setOrderTable(table) {
  return { type: SET_ORDER_TABLE, payload: table };
}

export function setOrderTableCategory(tableCategory) {
  return { type: SET_ORDER_TABLE_CATEGORY, payload: tableCategory };
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

export function invalidateOrdersList() {
  return { type: INVALIDATE_ORDERS_LIST };
}

export function toggleOrdersListFilter() {
  return { type: TOGGLE_ORDERS_LIST_FILTER };
}

export function loadSelectedOrderRequested(orderId) {
  return { type: LOAD_SELECTED_ORDER_REQUESTED, payload: orderId };
}

export function loadSelectedOrderCompleted(order) {
  return { type: LOAD_SELECTED_ORDER_COMPLETED, payload: order };
}

export function invalidateSelectedOrder() {
  return { type: INVALIDATE_SELECTED_ORDER };
}

export function printRequested(orderId) {
  return { type: PRINT_REQUESTED, payload: orderId };
}

export function printCompleted() {
  return { type: PRINT_COMPLETED };
}
