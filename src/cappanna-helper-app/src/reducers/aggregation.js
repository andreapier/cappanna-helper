import {
  RESET_ORDER_SELECTION_FOR_AGGREGATION,
  TOGGLE_ORDER_SELECTION_FOR_AGGREGATION
} from "actions/types";

const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case RESET_ORDER_SELECTION_FOR_AGGREGATION:
      return initialState;

    case TOGGLE_ORDER_SELECTION_FOR_AGGREGATION: {
      const index = state.indexOf(action.payload);

      if (index === -1) {
          return [...state, action.payload];
      } else {
          return state.filter(i => i !== action.payload);
      }
    }

    default:
      return state;
  }
}
