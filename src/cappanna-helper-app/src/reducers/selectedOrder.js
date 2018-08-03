import {
  LOAD_SELECTED_ORDER_REQUESTED,
  LOAD_SELECTED_ORDER_COMPLETED,
  INVALIDATE_SELECTED_ORDER,
  ORDER_CHANGED, ORDER_PRINTED
} from "actions/types";

const initialStatus = {
  loading: false,
  loaded: false,
  item: null
};

export default function(state = initialStatus, action) {
  switch (action.type) {
    case LOAD_SELECTED_ORDER_REQUESTED:
      return { ...state, loading: true, loaded: false, item: null };

    case LOAD_SELECTED_ORDER_COMPLETED:
      return { loading: false, loaded: true, item: action.payload };

    case INVALIDATE_SELECTED_ORDER:
      return initialStatus;

    case ORDER_CHANGED:
    case ORDER_PRINTED:
	  if (state.item.id !== action.payload.id) {
		  return state;
	  }
	  
	  return { loading: false, loaded: true, item: action.payload };

    default:
      return state;
  }
}
