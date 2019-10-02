import { LOADING_CHANGED } from "actions/types";

export const initialState = { loading: false, message: "" };

export default (state = initialState, action) => {
  switch (action.type) {
    case LOADING_CHANGED:
      return { ...action.payload };

    default:
      return state;
  }
};
