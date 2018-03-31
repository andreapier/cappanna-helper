import { LOGIN, LOGOUT } from "./endpoints";
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

let token;

class Api {
  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  setToken(token) {
    headers.Authorization = `Bearer ${token}`;
  }

  login(loginData) {
    return post(LOGIN, loginData).then(json => {
      token = json.token.value;
      this.setToken(token);

      return json;
    });
  }

  logout() {
    return post(LOGOUT).then(()=> {
      delete headers.Authorization;
    });
  }
}

export default Api;