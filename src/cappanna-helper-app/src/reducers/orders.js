import { LOAD_ORDERS_LIST_COMPLETED, ORDER_CREATED } from "actions/types";

const initialStatus = [];
const areEqual = (prev, next) => {
  if (prev.length !== next.length) {
    return false;
  }

  for (let i = 0, l = prev.length; i < l; i++) {
    console.log(prev[i].id, next[i].id);
    if (prev[i].id !== next[i].id) {
      return false;
    }
  }

  return true;
};

export default function(state = initialStatus, action) {
  switch (action.type) {
    case LOAD_ORDERS_LIST_COMPLETED:
      if (!areEqual(state, action.payload)) {
        return [...action.payload];
      }
      return state;

    case ORDER_CREATED:
      return [...state, action.payload];

    default:
      return state;
  }
}
