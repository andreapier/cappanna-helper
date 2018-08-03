import {
  CREATE_EMPTY_ORDER,
  INCREMENT_ORDER_DETAIL_QUANTITY,
  SET_ORDER_TABLE,
  SET_ORDER_TABLE_CATEGORY,
  SET_ORDER_SEATS,
  RESET_ORDER,
  SET_ORDER_NOTES,
  EDIT_ORDER,
  ORDER_CHANGED,
  ORDER_PRINTED
} from "actions/types";

export const initialState = {
  id: 0,
  seats: 2,
  chTable: 1,
  tableCategory: "",
  totalPrice: 0,
  details: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case RESET_ORDER:
      return {
        ...initialState,
        details: state.details.map(e => {
          return { ...e, quantity: 0 };
        })
      };

    case CREATE_EMPTY_ORDER:
      return {
        ...initialState,
        details: action.payload.map(e => {
          return {
            itemId: e.id,
            quantity: 0
          };
        })
      };

    case INCREMENT_ORDER_DETAIL_QUANTITY:
      const details = state.details.map(e => {
        if (e.itemId === action.payload.itemId) {
          return {
            ...e,
            quantity: e.quantity + action.payload.quantity
          };
        }

        return e;
      });

      const deltaPrice = action.payload.quantity * action.payload.price;

      return {
        ...state,
        totalPrice: state.totalPrice + deltaPrice,
        details
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
        totalPrice: action.payload.totalPrice,
        details: action.payload.details.map(e => {
          return {
            id: e.id,
            itemId: e.itemId,
            quantity: e.quantity
          };
        })
      };

    case ORDER_CHANGED:
	  if (state.id !== action.payload.id) {
		  return state;
	  }
	  
	  return {
        id: action.payload.id,
        chTable: action.payload.chTable,
        tableCategory: action.payload.tableCategory,
        seats: action.payload.seats,
        notes: action.payload.notes,
        totalPrice: action.payload.totalPrice,
        details: action.payload.details.map(e => {
          return {
            id: e.id,
            itemId: e.itemId,
            quantity: e.quantity
          };
        })
      };

    case ORDER_PRINTED:
	  if (state.id !== action.payload.id) {
		  return state;
	  }
	  
	  return { ...initialState };

    default:
      return state;
  }
}
