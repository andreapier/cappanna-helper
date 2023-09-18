import { LOAD_SETTINGS_LIST_COMPLETED, SET_SETTING_VALUE, SIGNOUT_COMPLETED } from "actions/types";

const initialState = [];

const settings = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_SETTINGS_LIST_COMPLETED:
            return action.payload;

        case SIGNOUT_COMPLETED:
            return initialState;

        case SET_SETTING_VALUE:
            return [
                ...state.filter((e) => e.id !== action.payload.settingId),
                {
                    ...state.find((e) => e.id === action.payload.settingId),
                    value: action.payload.settingValue
                }
            ];

        default:
            return state;
    }
};

export default settings;