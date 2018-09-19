import {
  LOAD_SETTINGS_LIST_REQUESTED,
  LOAD_SETTINGS_LIST_COMPLETED,
  INVALIDATE_SETTINGS_LIST,
  SET_SETTING_VALUE
} from "actions/types";

const initialState = {
  loading: false,
  loaded: false,
  items: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOAD_SETTINGS_LIST_REQUESTED:
      return {
        loading: true,
        loaded: false,
        items: []
      };

    case LOAD_SETTINGS_LIST_COMPLETED:
      return {
        loading: false,
        loaded: true,
        items: action.payload
      };

    case INVALIDATE_SETTINGS_LIST:
      return initialState;

    case SET_SETTING_VALUE:
      return {
        ...state,
        items: [
          ...state.items.filter(e => e.id !== action.payload.settingId),
          {
            ...state.items.find(e => e.id === action.payload.settingId),
            value: action.payload.settingValue
          }
        ]
      }

    default:
      return state;
  }
}
