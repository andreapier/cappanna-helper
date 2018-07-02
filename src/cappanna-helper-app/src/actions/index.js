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
  CONFIRM_ORDER,
  LOAD_ORDERS_LIST_REQUESTED,
  LOAD_ORDERS_LIST_COMPLETED,
  INVALIDATE_ORDERS_LIST,
  LOAD_SELECTED_ORDER_REQUESTED,
  LOAD_SELECTED_ORDER_COMPLETED,
  INVALIDATE_SELECTED_ORDER,
  PRINT_REQUESTED,
  PRINT_COMPLETED,
  RESET_ORDER,
  SET_ORDER_STATUS_REQUESTED,
  SET_ORDER_STATUS_COMPLETED,
  SET_ORDER_NOTES,
  SIGNUP_REQUESTED,
  SIGNUP_COMPLETED,
  CONNECT_SIGNALR,
  DISCONNECT_SIGNALR,
  ADD_MENU_DETAIL,
  MENU_DETAIL_AVAILABILITY_CHANGED,
  ORDER_CREATED
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

export function loadingChanged(loading, message = "") {
  return { type: LOADING_CHANGED, payload: { loading, message } };
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

export function incrementOrderDetailQuantity(itemId, quantity, price) {
  return {
    type: INCREMENT_ORDER_DETAIL_QUANTITY,
    payload: { itemId, quantity, price }
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

export function confirmOrder(order, userId) {
  return { type: CONFIRM_ORDER, payload: { order, userId } };
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

export function addMenuDetail(menuDetail) {
  return { type: ADD_MENU_DETAIL, payload: menuDetail, ...signalRAction };
}

export function menuDetailAvailabilityChanged(menuDetail) {
  return { type: MENU_DETAIL_AVAILABILITY_CHANGED, payload: menuDetail };
}
export function connectSignalR(userData) {
  return { type: CONNECT_SIGNALR, payload: userData, ...signalRAction };
}

export function disconnectSignalR() {
  return { type: DISCONNECT_SIGNALR, ...signalRAction };
}

export function orderCreated(order) {
  return { type: ORDER_CREATED, payload: order };
}
