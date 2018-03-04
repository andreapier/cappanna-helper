import { ERROR_OCCURRED, LOADING_CHANGED } from "./../actions/types";

export default function(state = null, action) {
  switch (action.type) {
    case ERROR_OCCURRED:
      return action.payload;

    case LOADING_CHANGED:
      return state;

    default:
      return null;
  }
}
