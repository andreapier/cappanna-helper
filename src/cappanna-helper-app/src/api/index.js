import { SIGNIN, SIGNOUT, SIGNIN_BY_TOKEN, ORDER, MENU_DETAIL, PRINT } from "./endpoints";
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
    this.getOrders = this.getOrders.bind(this);
    this.getMenuDetails = this.getMenuDetails.bind(this);
    this.sendOrder = this.sendOrder.bind(this);
  }

  signin({ username, password, rememberMe }) {
    return post(SIGNIN, { username, password, rememberMe }).then(json => {
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

  loginByToken(tokenToSave) {
    token = tokenToSave;

    return post(SIGNIN_BY_TOKEN, token);
  }

  getOrders() {
    return get(ORDER);
  }

  getOrder(orderId) {
    return get(`${ORDER}\\${orderId}`);
  }

  getMenuDetails() {
    return get(MENU_DETAIL);
  }

  sendOrder({ order, user }) {
    const serverOrder = {
      chTable: order.header.chTable + (order.header.tableCategory ? "/" + order.header.tableCategory : ""),
      seats: order.header.seats,
      details: [],
      createdById: user.id,
      notes: order.header.notes ? order.header.notes : null
    };
    order.details.filter(e => e.quantity > 0).map(e =>
      serverOrder.details.push({
        quantity: e.quantity,
        itemId: e.id
      })
    );
    return post(ORDER, serverOrder);
  }

  printOrder(orderId) {
    return get(`${ORDER}\\${orderId}\\${PRINT}`);
  }

  setOrderStatus({ orderId, status }) {
    return post(`${ORDER}\\${orderId}`, status);
  }
}

export default Api;
