import { LOGIN, LOGOUT, LOGIN_BY_TOKEN, ORDER, MENU_DETAIL, PRINT } from "./endpoints";
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
    this.getOrders = this.getOrders.bind(this);
    this.getMenuDetails = this.getMenuDetails.bind(this);
    this.sendOrder = this.sendOrder.bind(this);
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
  
  loginByToken(token) {
    headers.Authorization = `Bearer ${token}`;

    return post(LOGIN_BY_TOKEN, token);
  }

  logout() {
    return post(LOGOUT).then(()=> {
      delete headers.Authorization;
    });
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