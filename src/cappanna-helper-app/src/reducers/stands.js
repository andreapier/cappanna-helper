import { LOAD_STANDS_LIST_COMPLETED, SIGNIN_COMPLETED, SIGNOUT_COMPLETED } from "actions/types";

const initialState = [];

const stands = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_STANDS_LIST_COMPLETED:
      return action.payload;

    case SIGNIN_COMPLETED:
    case SIGNOUT_COMPLETED:
      return initialState;

    default:
      return state;
  }
};

export default stands;
