import { LOADING_CHANGED } from "./../actions/types";

export default function(state = { loading: false }, action) {
  switch (action.type) {
    case LOADING_CHANGED:
      return { ...action.payload };

    default:
      return state;
  }
}
