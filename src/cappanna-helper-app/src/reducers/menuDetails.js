import {
  LOAD_MENU_DETAILS_REQUESTED,
  LOAD_MENU_DETAILS_COMPLETED,
  INVALIDATE_MENU_DETAILS,
  MENU_DETAILS_CHANGED
} from "actions/types";

const initialState = {
  loading: false,
  loaded: false,
  items: []
};

const calculateUnitsInStock = unitsInStock => unitsInStock === null || unitsInStock === undefined ? Infinity : unitsInStock;

export default function(state = initialState, action) {
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
            unitsInStock: calculateUnitsInStock(e.unitsInStock)
          };
        })
      };

    case INVALIDATE_MENU_DETAILS:
      return initialState;

      case MENU_DETAILS_CHANGED:
        return {
          ...state,
          items: state.items.map(e => {
            const item = action.payload.find(i => e.id === i.id);

            if (item) {
              return {
                ...item,
                unitsInStock: calculateUnitsInStock(item.unitsInStock)
              };
            }
  
            return e;
          })
        };

    default:
      return state;
  }
}
