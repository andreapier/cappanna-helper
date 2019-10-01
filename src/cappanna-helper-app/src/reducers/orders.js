import {
  LOAD_ORDERS_LIST_COMPLETED,
  ORDER_CREATED,
  ORDER_CHANGED,
  ORDER_PRINTED,
  TOGGLE_ORDERS_LIST_FILTER_BY_USER,
  TOGGLE_ORDERS_LIST_FILTER_BY_STAND,
  SIGNIN_COMPLETED,
  SIGNOUT_COMPLETED
} from "actions/types";

const initialState = {
  items: [],
  filters: {
    user: false,
    stand: true
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOAD_ORDERS_LIST_COMPLETED:
      return {
        ...state,
        items: action.payload
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
          .map(o => {
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
      return {
        ...state,
        filters: {
          ...state.filters,
          user: action.payload.roles[0] === "waiter"
        }
      };

    case TOGGLE_ORDERS_LIST_FILTER_BY_USER:
      return {
        ...state,
        filters: {
          user: !state.filters.user,
          stand: false
        }
      };

    case TOGGLE_ORDERS_LIST_FILTER_BY_STAND:
      return {
        ...state,
        filters: {
          user: false,
          stand: !state.filters.stand
        }
      };

    default:
      return state;
  }
}
