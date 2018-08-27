import {
  LOAD_MENU_DETAILS_REQUESTED,
  LOAD_MENU_DETAILS_COMPLETED,
  INVALIDATE_MENU_DETAILS,
  MENU_DETAIL_CHANGED
} from "actions/types";

const initialStatus = {
  loading: false,
  loaded: false,
  items: []
};

const calculateUnitsInStock = unitsInStock => unitsInStock === null || unitsInStock === undefined ? Infinity : unitsInStock

export default function(state = initialStatus, action) {
  switch (action.type) {
    case LOAD_MENU_DETAILS_REQUESTED:
      return { ...state, loading: true, loaded: false };

    case LOAD_MENU_DETAILS_COMPLETED:
      return {
        loading: false,
        loaded: true,
        items: action.payload.map(e => {
          return {
            ...e,
            unitsInStock: calculateUnitsInStock(action.payload.unitsInStock)
          };
        })
      };

    case INVALIDATE_MENU_DETAILS:
      return initialStatus;

      case MENU_DETAIL_CHANGED:
        return {
          ...state,
          items: state.items.map(e => {
            if (e.id === action.payload.id) {
              return {
                ...action.payload,
                unitsInStock: calculateUnitsInStock(action.payload.unitsInStock)
              };
            }
  
            return e;
          })
        };

    default:
      return state;
  }
}
