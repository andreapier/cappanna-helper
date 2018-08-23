import { CALCULATE, RESET_ORDER } from "actions/types";

export const initialState = {
  amount: 0,
  paidAmount:0,
  seats:1,
  change: 0,
  perPersonAmount: 0
};

export default function(state = initialState, action) {
  switch (action.type) {
    case RESET_ORDER:
      return initialState;
      
    case CALCULATE:
      return {
        ...action.payload,
        change: action.payload.paidAmount - action.payload.amount,
        perPersonAmount: Math.ceil(action.payload.amount / action.payload.seats * 100) / 100
      };

    default:
      return state;
  }
}
