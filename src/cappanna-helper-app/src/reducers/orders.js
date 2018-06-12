import {
  LOAD_ORDERS_LIST_COMPLETED,
  LOAD_ORDER_COMPLETED,
  SET_ORDER_STATUS_COMPLETED,
  ORDER_CREATED
} from "actions/types";

export default function(state = { orders: [] }, action) {
  switch (action.type) {
    case LOAD_ORDERS_LIST_COMPLETED:
      return { ...state, orders: action.payload };

    case LOAD_ORDER_COMPLETED:
    case SET_ORDER_STATUS_COMPLETED:
      return { ...state, selected: action.payload };

    case ORDER_CREATED:
      return {...state, orders: [...state.orders, action.payload]}

    default:
      return state;
  }
}
