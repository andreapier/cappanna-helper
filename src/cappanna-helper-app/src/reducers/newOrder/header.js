import {
  INCREMENT_ORDER_DETAIL_QUANTITY,
  SET_ORDER_TABLE,
  SET_ORDER_SEATS,
  RESET_ORDER,
  SET_ORDER_NOTES,
  EDIT_ORDER,
  SIGNIN_COMPLETED,
  SIGNOUT_COMPLETED
} from "actions/types";

export const initialState = {
  id: 0,
  seats: 2,
  chTable: "1",
  notes: "",
  totalPrice: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGNIN_COMPLETED:
      initialState.chTable = action.payload.settings.standId === 1 ? "1" : "A";
      return state;

    case RESET_ORDER:
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
        seats: action.payload.seats,
        notes: action.payload.notes,
        totalPrice: action.payload.totalPrice
      };

    default:
      return state;
  }
};
