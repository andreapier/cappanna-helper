import {
  SIGNIN_REQUESTED,
  SIGNIN_COMPLETED,
  LOADING_CHANGED,
  SIGNOUT_REQUESTED,
  SIGNOUT_COMPLETED,
  SET_ERROR,
  LOAD_USER_DATA,
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
  LOAD_ORDER_REQUESTED,
  LOAD_ORDER_COMPLETED,
  PRINT_REQUESTED,
  PRINT_COMPLETED,
  RESET_ORDER,
  SET_ORDER_STATUS_REQUESTED,
  SET_ORDER_STATUS_COMPLETED,
  SET_ORDER_NOTES
} from "actions/types";

export function signinRequested({ username, password, rememberMe }) {
  return { type: SIGNIN_REQUESTED, payload: { username, password, rememberMe } };
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

export function loadingChanged(loading, description) {
  return { type: LOADING_CHANGED, payload: { loading, description } };
}

export function loadUserData() {
  return { type: LOAD_USER_DATA };
}

export function setError(message) {
  return { type: SET_ERROR, payload: message };
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
  return { type: SET_ORDER_STATUS_REQUESTED, payload: { orderId, status } };
}

export function setOrderStatusCompleted(order) {
  return { type: SET_ORDER_STATUS_COMPLETED, payload: order };
}

export function setOrderNotes(notes) {
  return { type: SET_ORDER_NOTES, payload: notes };
}
