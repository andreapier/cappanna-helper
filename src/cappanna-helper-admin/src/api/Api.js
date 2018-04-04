import { SIGNIN, SIGNOUT } from "./endpoints";
import "whatwg-fetch";

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json"
};

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
    credentials: 'same-origin',
    headers,
    body: JSON.stringify(data)
  })
    .then(checkStatus)
    .then(parseJSON);

const get = url =>
  fetch(url, {
    method: "GET",
    headers
  })
    .then(checkStatus)
    .then(parseJSON);

const parseJSON = response => response.json();

class Api {
  constructor() {
    this.signin = this.signin.bind(this);
    this.signout = this.signout.bind(this);
  }

  signin({ username, password, rememberMe }) {
    console.log('api', SIGNIN, { username, password, rememberMe });
    return post(SIGNIN, { username, password, rememberMe });
  }

  signout() {
    return post(SIGNOUT);
  }
}

export default Api;