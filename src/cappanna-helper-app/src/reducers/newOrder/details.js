import {
  INCREMENT_ORDER_DETAIL_QUANTITY,
  RESET_ORDER,
  EDIT_ORDER,
  LOAD_MENU_DETAILS_COMPLETED,
  INVALIDATE_MENU_DETAILS,
  INVALIDATE_ORDERS_LIST,
  INVALIDATE_NOTIFICATIONS_LIST,
  INVALIDATE_DASHBOARD_DATA,
  INVALIDATE_SETTINGS_LIST
} from "actions/types";

export const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case RESET_ORDER:
    case INVALIDATE_MENU_DETAILS:
    case INVALIDATE_ORDERS_LIST:
    case INVALIDATE_NOTIFICATIONS_LIST:
    case INVALIDATE_DASHBOARD_DATA:
    case INVALIDATE_SETTINGS_LIST:
      return state.map(e => ({ itemId: e.itemId, quantity: 0 }));

    case LOAD_MENU_DETAILS_COMPLETED:
      if (state.length === 0) {
        return action.payload.map(e => ({ itemId: e.id, quantity: 0 }));
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
        quantity: e.quantity
      }));

    default:
      return state;
  }
}
