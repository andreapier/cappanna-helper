import { LOAD_USERS_LIST_COMPLETED, SIGNOUT_COMPLETED } from "actions/types";

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_USERS_LIST_COMPLETED:
      return action.payload;

    case SIGNOUT_COMPLETED:
      return initialState;

    default:
      return state;
  }
};
