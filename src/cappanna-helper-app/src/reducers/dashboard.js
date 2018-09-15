import {
  LOAD_DASHBOARD_DATA_REQUESTED,
  LOAD_DASHBOARD_DATA_COMPLETED,
  INVALIDATE_DASHBOARD_DATA,
  DASHBOARD_DATA_CHANGED
} from "actions/types";

export const initialState = {
  loading: false,
  loaded: false,
  data: {
    waitersStats: [],
    ordersQuantity: 0,
    income: 0
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOAD_DASHBOARD_DATA_REQUESTED:
      return {
        ...state,
        loading: true,
        loaded: false
      };
      
    case LOAD_DASHBOARD_DATA_COMPLETED:
    case DASHBOARD_DATA_CHANGED:
      return {
        loading: false,
        loaded: true,
        data: {
          ...action.payload
        }
      };

    case INVALIDATE_DASHBOARD_DATA:
      return initialState;

    default:
      return state;
  }
}
