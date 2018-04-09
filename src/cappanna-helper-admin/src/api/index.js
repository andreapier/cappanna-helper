import {
  SIGNIN,
  SIGNOUT,
  SIGNUP,
  MENU_DETAIL
} from "./endpoints";
import "whatwg-fetch";

const baseHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json"
};

let token;

const getHeaders = () => {
  let headers = baseHeaders;
  
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}

const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;

  throw error;
};

const post = (url, data) =>
  fetch(url, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data)
  })
    .then(checkStatus)
    .then(parseJSON);

const get = url =>
  fetch(url, {
    method: "GET",
    headers: getHeaders()
  })
    .then(checkStatus)
    .then(parseJSON);

const parseJSON = response => response.json();

class Api {
  constructor() {
    this.signin = this.signin.bind(this);
    this.signout = this.signout.bind(this);
    this.signup = this.signup.bind(this);
    this.getMenuDetails = this.getMenuDetails.bind(this);
  }

  signin({ username, password, rememberMe }) {
    return post(SIGNIN, { username, password, rememberMe })
      .then(json => {
        token = json.token;
        return json;
      });
  }

  signout() {
    return post(SIGNOUT).then(json => {
        token = undefined;
        return json;
      });
  }

  signup({ username, password, confirmPassword, firstName, lastName }) {
    return post(SIGNUP, { username, password, confirmPassword, firstName, lastName });
  }

  getMenuDetails() {
    return get(MENU_DETAIL);
  }
}

export default Api;