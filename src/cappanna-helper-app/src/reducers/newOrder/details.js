import {
  INCREMENT_ORDER_DETAIL_QUANTITY,
  RESET_ORDER,
  EDIT_ORDER,
  LOAD_MENU_DETAILS_COMPLETED,
  SIGNOUT_COMPLETED
} from "actions/types";

export const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case RESET_ORDER:
      return state.map(e => ({
        itemId: e.itemId,
        quantity: 0,
        initialQuantity: 0
      }));

    case LOAD_MENU_DETAILS_COMPLETED:
      if (state.length === 0) {
        return action.payload.map(e => ({
          itemId: e.id,
          quantity: 0,
          initialQuantity: 0
        }));
      }
      return state;

    case INCREMENT_ORDER_DETAIL_QUANTITY:
      const detailIndex = state.findIndex(
        e => e.itemId === action.payload.itemId
      );
      const detail = state.find(e => e.itemId === action.payload.itemId);
      const quantity = detail.quantity + action.payload.quantity;

      state[detailIndex] = {
        ...detail,
        quantity,
        subtotal: quantity * action.payload.price
      };

      return [...state];

    case EDIT_ORDER:
      return action.payload.details.map(e => ({
        id: e.id,
        itemId: e.itemId,
        quantity: e.quantity,
        initialQuantity: e.quantity
      }));

    case SIGNOUT_COMPLETED:
      return initialState;

    default:
      return state;
  }
}
