import {
  LOAD_MENU_DETAILS_REQUESTED,
  LOAD_MENU_DETAILS_COMPLETED
} from "actions/types";

const initialStatus = {
  loading: false,
  loaded: false,
  items: []
};

export default function(state = initialStatus, action) {
  switch (action.type) {
    case LOAD_MENU_DETAILS_REQUESTED:
      return { ...state, loading: true, loaded: false };

    case LOAD_MENU_DETAILS_COMPLETED:
      return {
        loading: false,
        loaded: true,
        items: action.payload.map(e => {
          return {
            ...e,
            isAvailable: !e.unitsInStock || e.unitsInStock > 0
          };
        })
      };

    default:
      return state;
  }
}
