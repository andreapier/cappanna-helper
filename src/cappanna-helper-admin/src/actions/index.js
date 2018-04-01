import {
  LOGIN_REQUESTED,
  LOGIN_COMPLETED,
  LOADING_CHANGED,
  LOGOUT_REQUESTED,
  LOGOUT_COMPLETED,
  ERROR_OCCURRED
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

export function loadingChanged(loading, description) {
  return { type: LOADING_CHANGED, payload: { loading, description } };
}

export function errorOccurred(errorMessage) {
  return { type: ERROR_OCCURRED, payload: errorMessage };
}
