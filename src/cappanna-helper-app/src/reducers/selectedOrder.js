import { LOAD_SELECTED_ORDER_COMPLETED, ORDER_CHANGED, ORDER_PRINTED, ORDER_CLOSED, SIGNOUT_COMPLETED } from "actions/types";

const initialState = null;

const selectedOrder = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_SELECTED_ORDER_COMPLETED:
            return action.payload;

        case SIGNOUT_COMPLETED:
            return initialState;

        case ORDER_CHANGED:
        case ORDER_PRINTED:
        case ORDER_CLOSED:
            if (state && state.id !== action.payload.id) {
                return state;
            }

            return action.payload;

        default:
            return state;
    }
};

export default selectedOrder;