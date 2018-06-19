import {
  LOAD_ORDERS_LIST_REQUESTED,
  LOAD_ORDERS_LIST_COMPLETED,
  ORDER_CREATED
} from "actions/types";

const initialStatus = {
  loading: false,
  loaded: false,
  items: []
};

export default function(state = initialStatus, action) {
  switch (action.type) {
    case LOAD_ORDERS_LIST_REQUESTED:
      return { ...state, loading: true };
    case LOAD_ORDERS_LIST_COMPLETED:
      return { loading: false, loaded: true, items: action.payload };

    case ORDER_CREATED:
      return { ...state, items: [...state.items, action.payload] };

    default:
      return state;
  }
}
