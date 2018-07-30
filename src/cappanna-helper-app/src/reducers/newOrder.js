import {
  CREATE_EMPTY_ORDER,
  INCREMENT_ORDER_DETAIL_QUANTITY,
  SET_ORDER_TABLE,
  SET_ORDER_TABLE_CATEGORY,
  SET_ORDER_SEATS,
  RESET_ORDER,
  SET_ORDER_NOTES,
  EDIT_ORDER
} from "actions/types";

export const initialState = {
  header: {
    seats: 2,
    chTable: 1,
    tableCategory: "",
    totalPrice: 0
  },
  details: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case RESET_ORDER:
      return {
        header: initialState.header,
        details: state.details.map(e => {
          return { ...e, quantity: 0 };
        })
      };

    case CREATE_EMPTY_ORDER:
      return {
        header: initialState.header,
        details: action.payload.map(e => {
          return {
            itemId: e.itemId,
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
        header: {
          ...state.header,
          totalPrice: state.header.totalPrice + deltaPrice
        },
        details
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

    case EDIT_ORDER:
      return {
        header: {
          id: action.payload.id,
          chTable: action.payload.chTable,
          tableCategory: action.payload.tableCategory,
          seats: action.payload.seats,
          notes: action.payload.notes,
          totalPrice: action.payload.details.reduce(
            (acc, e) => acc + e.quantity * e.price,
            0
          )
        },
        details: [...action.payload.details]
      };

    default:
      return state;
  }
}
