import {
  SIGNIN_REQUESTED,
  SIGNIN_COMPLETED,
  LOADING_CHANGED,
  SIGNOUT_REQUESTED,
  SIGNOUT_COMPLETED,
  ERROR_OCCURRED
} from "./types";

export function signinRequested({username, password, rememberMe}) {
  return { type: SIGNIN_REQUESTED, payload: {username, password, rememberMe} };
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

export function errorOccurred(errorMessage) {
  return { type: ERROR_OCCURRED, payload: errorMessage };
}
