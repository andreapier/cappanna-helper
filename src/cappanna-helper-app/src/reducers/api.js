import { LOADING_CHANGED } from "actions/types";

export const initialState = { loading: false, message: "" };

const api = (state = initialState, action) => {
    switch (action.type) {
        case LOADING_CHANGED:
            return { ...action.payload };

        default:
            return state;
    }
};

export default api;