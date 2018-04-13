import {
  SIGNIN_REQUESTED,
  SIGNIN_COMPLETED,
  LOADING_CHANGED,
  SIGNOUT_REQUESTED,
  SIGNOUT_COMPLETED,
  SET_ERROR,
  LOAD_USER_DATA,
  SIGNUP_REQUESTED,
  SIGNUP_COMPLETED,
  LOAD_MENU_DETAILS_REQUESTED,
  LOAD_MENU_DETAILS_COMPLETED,
  ADD_MENU_DETAIL,
  MENU_DETAIL_AVAILABILITY_CHANGED,
  CONNECT_SIGNALR,
  DISCONNECT_SIGNALR
} from 'actions/types';

const signalRAction = {
  metadata: {
    signalR: true
  }
};

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

export function signupRequested({ username, password, confirmPassword, firstName, lastName }) {
  return { type: SIGNUP_REQUESTED, payload: { username, password, confirmPassword, firstName, lastName } };
}

export function signupCompleted() {
  return { type: SIGNUP_COMPLETED };
}

export function loadMenuDetailsRequested() {
  return { type: LOAD_MENU_DETAILS_REQUESTED };
}

export function loadMenuDetailsCompleted(menuDetails) {
  return { type: LOAD_MENU_DETAILS_COMPLETED, payload: menuDetails };
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
