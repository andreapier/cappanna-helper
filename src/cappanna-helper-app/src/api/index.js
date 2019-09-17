import {
  SIGNIN,
  SIGNOUT,
  SIGNUP,
  ORDER,
  MENU_DETAIL,
  PRINT,
  NOTIFICATION,
  DASHBOARD,
  SETTING,
  STAND,
  ACCOUNT
} from "api/endpoints";
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

  return parseJSON(response).then(json => {
    const error = new Error(json.message);
    error.stackTrace = json.stackTrace;
    error.response = response;

    throw error;
  });
};

const post = (url, data, jsonResponse = true) =>
  fetch(url, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data)
  })
    .then(checkStatus)
    .then(json => (jsonResponse ? parseJSON(json) : json));

const get = url =>
  fetch(url, {
    method: "GET",
    headers: getHeaders()
  })
    .then(checkStatus)
    .then(parseJSON);

const patch = (url, data) =>
  fetch(url, {
    method: "PATCH",
    headers: getHeaders(),
    body: data ? JSON.stringify(data) : undefined
  })
    .then(checkStatus)
    .then(parseJSON);

const _delete = url =>
  fetch(url, {
    method: "DELETE",
    headers: getHeaders()
  })
    .then(checkStatus)
    .then(parseJSON);

const parseJSON = response => response.json();

const getServerOrder = order => {
  return {
    id: order.id,
    chTable:
      order.chTable + (order.tableCategory ? "\\" + order.tableCategory : ""),
    seats: order.seats,
    standId: order.standId,
    details: order.details
      .filter(e => e.quantity > 0)
      .map(e => {
        return {
          id: e.id,
          quantity: e.quantity,
          itemId: e.itemId
        };
      }),
    notes: order.notes
  };
};

class Api {
  constructor() {
    this.signin = this.signin.bind(this);
    this.signout = this.signout.bind(this);
    this.getOrders = this.getOrders.bind(this);
    this.getMenuDetails = this.getMenuDetails.bind(this);
    this.createOrder = this.createOrder.bind(this);
  }

  signin({ userId, username, password, rememberMe }) {
    return post(SIGNIN, { userId, username, password, rememberMe }).then(
      json => {
        token = json.token;
        return json;
      }
    );
  }

  setToken(aToken) {
    token = aToken;
  }

  signout() {
    return post(SIGNOUT, undefined, false).then(json => {
      token = undefined;
      return json;
    });
  }

  signup({ username, password, confirmPassword, firstName, lastName }) {
    return post(SIGNUP, {
      username,
      password,
      confirmPassword,
      firstName,
      lastName
    });
  }

  getOrders() {
    return get(ORDER);
  }

  getOrder(orderId) {
    return get(`${ORDER}/${orderId}`);
  }

  getMenuDetails() {
    return get(MENU_DETAIL);
  }

  editMenuDetail(detail) {
    const serverDetail = {
      ...detail,
      unitsInStock:
        detail.unitsInStock === Infinity ? null : detail.unitsInStock
    };
    return patch(MENU_DETAIL, serverDetail);
  }

  createOrder(order) {
    const serverOrder = getServerOrder(order);

    return post(ORDER, serverOrder);
  }

  editOrder(order) {
    const serverOrder = getServerOrder(order);

    return patch(ORDER, serverOrder);
  }

  deleteOrder(orderId) {
    return _delete(`${ORDER}/${orderId}`);
  }

  closeOrder(orderId) {
    return patch(`${ORDER}/${orderId}/close`);
  }

  printOrder(orderId) {
    return get(`${PRINT}/order/${orderId}`);
  }

  setOrderStatus({ orderId, status }) {
    return post(`${ORDER}/${orderId}`, status);
  }

  aggregateOrderDetails(ordersId) {
    return get(
      `${PRINT}/order/aggregate?${ordersId.map(o => "ordersId=" + o).join("&")}`
    );
  }

  getNotifications() {
    return get(NOTIFICATION);
  }

  getDashboardData() {
    return get(DASHBOARD);
  }

  getSettings() {
    return get(SETTING);
  }

  saveSetting(setting) {
    return patch(SETTING, setting);
  }

  getStands() {
    return get(STAND);
  }

  getUsers() {
    return get(ACCOUNT);
  }
}

export default Api;
