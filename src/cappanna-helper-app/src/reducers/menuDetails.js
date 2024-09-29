import { LOAD_MENU_DETAILS_COMPLETED, MENU_DETAILS_CHANGED, SIGNIN_COMPLETED, SIGNOUT_COMPLETED } from "actions/types";

const initialState = [];

const calculateUnitsInStock = (unitsInStock) =>
  unitsInStock === null || unitsInStock === undefined ? Infinity : unitsInStock < 0 ? 0 : unitsInStock;

const menuDetail = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_MENU_DETAILS_COMPLETED:
      return action.payload.map((e) => {
        return {
          ...e,
          unitsInStock: calculateUnitsInStock(e.unitsInStock)
        };
      });

    case MENU_DETAILS_CHANGED:
      return state.map((e) => {
        const item = action.payload.find((i) => e.id === i.id);

        if (item) {
          return {
            ...item,
            unitsInStock: calculateUnitsInStock(item.unitsInStock)
          };
        }

        return e;
      });

    case SIGNIN_COMPLETED:
    case SIGNOUT_COMPLETED:
      return initialState;

    default:
      return state;
  }
};

export default menuDetail;
