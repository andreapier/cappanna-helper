import {
  LOGIN_REQUESTED,
  LOGIN_COMPLETED,
  LOGOUT_REQUESTED,
  LOGOUT_COMPLETED,
  LOAD_USER_DATA,
  LOADING_CHANGED,
  LOAD_MENU_DETAILS_REQUESTED,
  LOAD_MENU_DETAILS_COMPLETED,
  CREATE_EMPTY_ORDER,
  INCREMENT_ORDER_DETAIL_QUANTITY,
  SET_ORDER_TABLE,
  SET_ORDER_TABLE_CATEGORY,
  SET_ORDER_SEATS,
  SEND_ORDER,
  LOAD_ORDERS_LIST_REQUESTED,
  LOAD_ORDERS_LIST_COMPLETED,
  ERROR_OCCURRED,
  LOAD_ORDER_REQUESTED,
  LOAD_ORDER_COMPLETED,
  PRINT_REQUESTED,
  PRINT_COMPLETED,
  RESET_ORDER,
  SET_ORDER_STATUS_REQUESTED,
  SET_ORDER_STATUS_COMPLETED,
  SET_ORDER_NOTES
} from "./types";

export function loginRequested(loginData) {
  return { type: LOGIN_REQUESTED, payload: loginData };
}

export function loginCompleted(userData) {
  return { type: LOGIN_COMPLETED, payload: userData };
}

export function logoutRequested() {
  return { type: LOGOUT_REQUESTED };
}

export function logoutCompleted() {
  return { type: LOGOUT_COMPLETED };
}

export function loadUserData() {
  return { type: LOAD_USER_DATA };
}

export function loadingChanged(loading, description) {
  return { type: LOADING_CHANGED, payload: { loading, description } };
}

export function loadMenuDetailsRequested() {
  return { type: LOAD_MENU_DETAILS_REQUESTED };
}

export function loadMenuDetailsCompleted(menuDetails) {
  return { type: LOAD_MENU_DETAILS_COMPLETED, payload: menuDetails };
}

export function createEmptyOrder(menu) {
  return { type: CREATE_EMPTY_ORDER, payload: menu };
}

export function incrementOrderDetailQuantity(item, increment) {
  return {
    type: INCREMENT_ORDER_DETAIL_QUANTITY,
    payload: { item, increment }
  };
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

export function sendOrder(order, user) {
  return { type: SEND_ORDER, payload: { order, user } };
}

export function loadOrdersListRequested() {
  return { type: LOAD_ORDERS_LIST_REQUESTED };
}

export function loadOrdersListCompleted(orders) {
  return { type: LOAD_ORDERS_LIST_COMPLETED, payload: orders };
}

export function errorOccurred(errorMessage) {
  return { type: ERROR_OCCURRED, payload: errorMessage };
}

export function loadOrderRequested(orderId) {
  return { type: LOAD_ORDER_REQUESTED, payload: orderId };
}

export function loadOrderCompleted(order) {
  return { type: LOAD_ORDER_COMPLETED, payload: order };
}

export function printRequested(orderId) {
  return { type: PRINT_REQUESTED, payload: orderId };
}

export function printCompleted() {
  return { type: PRINT_COMPLETED };
}

export function resetOrder() {
  return { type: RESET_ORDER };
}

export function setOrderStatusRequested(orderId, status) {
  return { type: SET_ORDER_STATUS_REQUESTED, payload: { orderId, status }};
}

export function setOrderStatusCompleted(order) {
  return { type: SET_ORDER_STATUS_COMPLETED, payload: order };
}

export function setOrderNotes(notes) {
  return {type: SET_ORDER_NOTES, payload: notes}
}