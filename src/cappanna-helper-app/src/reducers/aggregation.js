import {
  RESET_ORDER_SELECTION_FOR_AGGREAGATE,
  TOGGLE_ORDER_SELECTION_FOR_AGGREGATE
} from "actions/types";

const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case RESET_ORDER_SELECTION_FOR_AGGREAGATE:
      return initialState;

    case TOGGLE_ORDER_SELECTION_FOR_AGGREGATE: {
      let found = false;

      return {
        ...state,
        selectedForAggregation: state.selectedForAggregation
          .map(o => {
            if (o === action.payload) {
              found = true;
              return action.payload;
            }

            return o;
          })
          .concat(found ? [] : [action.payload])
      };
    }

    default:
      return state;
  }
}
