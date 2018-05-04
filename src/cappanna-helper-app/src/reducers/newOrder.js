import {
  CREATE_EMPTY_ORDER,
  INCREMENT_ORDER_DETAIL_QUANTITY,
  SET_ORDER_TABLE,
  SET_ORDER_TABLE_CATEGORY,
  SET_ORDER_SEATS,
  RESET_ORDER,
  SET_ORDER_NOTES
} from "actions/types";

export default function(state = null, action) {
  switch (action.type) {
    case RESET_ORDER:
      return {
        header: {
          seats: 2,
          chTable: 1,
          tableCategory: "",
          totalPrice: 0
        },
        details: state.details.map(e => {
          return { ...e, quantity: 0 };
        })
      };

    case CREATE_EMPTY_ORDER:
      return {
        header: {
          seats: 2,
          chTable: 1,
          tableCategory: "",
          totalPrice: 0
        },
        details: action.payload.map(e => {
          return { ...e, quantity: 0 };
        })
      };

    case INCREMENT_ORDER_DETAIL_QUANTITY:
      const changedIndex = state.details.indexOf(action.payload.item);
      const changedItem = state.details[changedIndex];
      const newQuantity = changedItem.quantity + action.payload.increment;
      const deltaPrice = action.payload.increment * changedItem.price;
      state.details[changedIndex] = { ...changedItem, quantity: newQuantity };

      return {
        header: {
          ...state.header,
          totalPrice: state.header.totalPrice + deltaPrice
        },
        details: state.details
      };

    case SET_ORDER_TABLE:
      return {
        ...state,
        header: {
          ...state.header,
          chTable: action.payload
        }
      };

    case SET_ORDER_TABLE_CATEGORY:
      return {
        ...state,
        header: {
          ...state.header,
          tableCategory: action.payload
        }
      };

    case SET_ORDER_SEATS:
      return {
        ...state,
        header: {
          ...state.header,
          seats: action.payload
        }
      };

    case SET_ORDER_NOTES:
      return {
        ...state,
        header: {
          ...state.header,
          notes: action.payload
        }
      };

    default:
      return state;
  }
}
