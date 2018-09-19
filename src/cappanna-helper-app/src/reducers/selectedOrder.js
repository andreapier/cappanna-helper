import {
  LOAD_SELECTED_ORDER_REQUESTED,
  LOAD_SELECTED_ORDER_COMPLETED,
  INVALIDATE_SELECTED_ORDER,
  ORDER_CHANGED,
  ORDER_PRINTED,
  ORDER_CLOSED,
  SIGNOUT_COMPLETED
} from "actions/types";

const initialState = {
  loading: false,
  loaded: false,
  item: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOAD_SELECTED_ORDER_REQUESTED:
      return { ...state, loading: true, loaded: false, item: null };

    case LOAD_SELECTED_ORDER_COMPLETED:
      return { loading: false, loaded: true, item: action.payload };

    case INVALIDATE_SELECTED_ORDER:
    case SIGNOUT_COMPLETED:
      return initialState;

    case ORDER_CHANGED:
    case ORDER_PRINTED:
    case ORDER_CLOSED:
      if (state.item && state.item.id !== action.payload.id) {
        return state;
      }

      return { loading: false, loaded: true, item: action.payload };

    default:
      return state;
  }
}
