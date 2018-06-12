import { LOAD_ORDERS_LIST_COMPLETED } from "actions/types";

const initialStatus = [];

export default function(state = initialStatus, action) {
  switch (action.type) {
    case LOAD_ORDERS_LIST_COMPLETED:
      return [...action.payload];

    case ORDER_CREATED:
      return {...state, orders: [...state.orders, action.payload]}

    default:
      return state;
  }
}
