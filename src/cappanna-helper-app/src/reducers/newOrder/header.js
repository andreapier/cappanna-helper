import {
  INCREMENT_ORDER_DETAIL_QUANTITY,
  SET_ORDER_TABLE,
  SET_ORDER_TABLE_CATEGORY,
  SET_ORDER_SEATS,
  RESET_ORDER,
  SET_ORDER_NOTES,
  EDIT_ORDER,
  INVALIDATE_MENU_DETAILS,
  INVALIDATE_ORDERS_LIST,
  INVALIDATE_NOTIFICATIONS_LIST,
  INVALIDATE_DASHBOARD_DATA,
  INVALIDATE_SETTINGS_LIST,
  SIGNOUT_COMPLETED
} from "actions/types";

export const initialState = {
  id: 0,
  seats: 2,
  chTable: 1,
  tableCategory: "",
  totalPrice: 0
};

export default function(state = initialState, action) {
  switch (action.type) {
    case RESET_ORDER:
    case INVALIDATE_MENU_DETAILS:
    case INVALIDATE_ORDERS_LIST:
    case INVALIDATE_NOTIFICATIONS_LIST:
    case INVALIDATE_DASHBOARD_DATA:
    case INVALIDATE_SETTINGS_LIST:
    case SIGNOUT_COMPLETED:
      return initialState;

    case INCREMENT_ORDER_DETAIL_QUANTITY:
      return {
        ...state,
        totalPrice:
          state.totalPrice + action.payload.quantity * action.payload.price
      };

    case SET_ORDER_TABLE:
      return {
        ...state,
        chTable: action.payload
      };

    case SET_ORDER_TABLE_CATEGORY:
      return {
        ...state,
        tableCategory: action.payload
      };

    case SET_ORDER_SEATS:
      return {
        ...state,
        seats: action.payload
      };

    case SET_ORDER_NOTES:
      return {
        ...state,
        notes: action.payload
      };

    case EDIT_ORDER:
      return {
        id: action.payload.id,
        chTable: action.payload.chTable,
        tableCategory: action.payload.tableCategory,
        seats: action.payload.seats,
        notes: action.payload.notes,
        totalPrice: action.payload.totalPrice
      };

    default:
      return state;
  }
}
