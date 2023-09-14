import { CALCULATE, SIGNOUT_COMPLETED } from "actions/types";

export const initialState = {
    amount: 0,
    paidAmount: 0,
    seats: 1,
    change: 0,
    perPersonAmount: 0
};

const calculator = (state = initialState, action) => {
    switch (action.type) {
        case SIGNOUT_COMPLETED:
            return initialState;

        case CALCULATE:
            return {
                ...action.payload,
                change: action.payload.paidAmount - action.payload.amount,
                perPersonAmount: Math.ceil((action.payload.amount / action.payload.seats) * 100) / 100
            };

        default:
            return state;
    }
};

export default calculator;