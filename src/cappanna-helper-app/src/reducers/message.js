import { NOTIFY_INFO, NOTIFY_WARNING, NOTIFY_ERROR, RESET_NOTIFICATION, SIGNOUT_COMPLETED } from "actions/types";

const initialState = {
    message: "",
    type: ""
};

const message = (state = initialState, action) => {
    switch (action.type) {
        case NOTIFY_INFO:
            return { type: "info", message: action.payload };

        case NOTIFY_WARNING:
            return { type: "warning", message: action.payload };

        case NOTIFY_ERROR:
            return { type: "error", message: action.payload };

        case RESET_NOTIFICATION:
        case SIGNOUT_COMPLETED:
            return initialState;

        default:
            return state;
    }
};

export default message;