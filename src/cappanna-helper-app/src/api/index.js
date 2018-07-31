import {
  SIGNIN,
  SIGNOUT,
  SIGNUP,
  ORDER,
  MENU_DETAIL,
  PRINT
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

const put = (url, data) =>
  fetch(url, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(data)
  })
    .then(checkStatus)
    .then(parseJSON);

const parseJSON = response => response.json();

const getServerOrder = order => {
  return {
    chTable:
      order.header.chTable +
      (order.header.tableCategory ? "/" + order.header.tableCategory : ""),
    seats: order.header.seats,
    details: order.details.filter(e => e.quantity > 0).map(e =>{
      return {
        quantity: e.quantity,
        itemId: e.itemId
      }
    }),
    notes: order.header.notes ? order.header.notes : null
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
    return post(SIGNOUT).then(json => {
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

  createOrder(order) {
    const serverOrder = getServerOrder(order);
    
    return post(ORDER, serverOrder);
  }

  editOrder(order){
    const serverOrder = getServerOrder(order);

    return put(ORDER, serverOrder);
  }

  printOrder(orderId) {
    return get(`${PRINT}/order/${orderId}`);
  }

  setOrderStatus({ orderId, status }) {
    return post(`${ORDER}/${orderId}`, status);
  }
}

export default Api;
