import {
  LOAD_ORDERS_LIST_REQUESTED,
  LOAD_ORDERS_LIST_COMPLETED,
  INVALIDATE_ORDERS_LIST
} from "actions/types";

const initialStatus = {
  loading: false,
  loaded: false,
  items: []
};

export default function(state = initialStatus, action) {
  switch (action.type) {
    case LOAD_ORDERS_LIST_REQUESTED:
      return { ...state, loading: true, loaded: false, items: [] };

    case LOAD_ORDERS_LIST_COMPLETED:
      return { loading: false, loaded: true, items: action.payload };

    case INVALIDATE_ORDERS_LIST:
      return initialStatus;

    default:
      return state;
  }
}
