import {
  LOAD_ORDERS_LIST_REQUESTED,
  LOAD_ORDERS_LIST_COMPLETED,
  INVALIDATE_ORDERS_LIST,
  ORDER_CREATED,
  ORDER_CHANGED,
  ORDER_PRINTED
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

    case ORDER_CREATED:
      return { ...state, items: [action.payload].concat(state.items) };

    case ORDER_CHANGED:
	case ORDER_PRINTED:
	  let found = false;
	  
      return {
		...state,
		items: state.items
			.map(o => {
				if (o.id === action.payload.id) {
				  found = true;
				  return action.payload;
				}

				return o;
			  })
			.concat(found ? [] : [action.payload])
	  };

    default:
      return state;
  }
}
