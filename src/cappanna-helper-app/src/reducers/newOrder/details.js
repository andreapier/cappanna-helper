import {
  CREATE_EMPTY_ORDER,
  INCREMENT_ORDER_DETAIL_QUANTITY,
  RESET_ORDER,
  EDIT_ORDER
} from "actions/types";

export const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case RESET_ORDER:
      return state.map(e => ({
        itemId: e.itemId,
        quantity: 0
      }));

    case CREATE_EMPTY_ORDER:
      return action.payload.map(e => ({
        itemId: e.id,
        quantity: 0
      }));

    case INCREMENT_ORDER_DETAIL_QUANTITY:
      const detailIndex = state.findIndex(e => e.itemId === action.payload.itemId);
      const detail = state.find(e => e.itemId === action.payload.itemId);
      const quantity = detail.quantity + action.payload.quantity;

      state[detailIndex] = {
        ...detail,
        quantity
        subtotal: quantity * action.payload.price
      };

      return [...state];

    case EDIT_ORDER:
      return action.payload.details.map(e => ({
        id: e.id,
        itemId: e.itemId,
        quantity: e.quantity
      }));

    default:
      return state;
  }
}
