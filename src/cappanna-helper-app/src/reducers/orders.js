import {
  LOAD_ORDERS_LIST_COMPLETED,
  ORDER_CREATED,
  ORDER_CHANGED,
  ORDER_PRINTED,
  TOGGLE_ORDERS_LIST_FILTER_BY_USER,
  TOGGLE_ORDERS_LIST_FILTER_BY_STAND,
  TOGGLE_ORDERS_LIST_FILTER_BY_STATUS,
  SIGNIN_COMPLETED,
  SIGNOUT_COMPLETED,
  LOAD_ORDERS_LIST_REQUESTED
} from "actions/types";

const initialState = {
  items: [],
  filters: {
    user: false,
    stand: true,
    status: true
  }
};

const orders = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ORDERS_LIST_COMPLETED:
      return {
        ...state,
        items: action.payload
      };

    case LOAD_ORDERS_LIST_REQUESTED:
      return {
        ...state,
        items: []
      };

    case SIGNOUT_COMPLETED:
      return initialState;

    case ORDER_CREATED:
      return { ...state, items: [action.payload].concat(state.items) };

    case ORDER_CHANGED:
    case ORDER_PRINTED: {
      let found = false;

      return {
        ...state,
        items: state.items
          .map((o) => {
            if (o.id === action.payload.id) {
              found = true;
              return action.payload;
            }

            return o;
          })
          .concat(found ? [] : [action.payload])
      };
    }

    case SIGNIN_COMPLETED:
      return initialState;

    case TOGGLE_ORDERS_LIST_FILTER_BY_USER:
      return {
        ...state,
        filters: {
          ...state.filters,
          user: !state.filters.user,
          stand: false
        }
      };

    case TOGGLE_ORDERS_LIST_FILTER_BY_STAND:
      return {
        ...state,
        filters: {
          ...state.filters,
          user: false,
          stand: !state.filters.stand
        }
      };

    case TOGGLE_ORDERS_LIST_FILTER_BY_STATUS:
      return {
        ...state,
        filters: {
          ...state.filters,
          status: !state.filters.status
        }
      };

    default:
      return state;
  }
};

export default orders;
