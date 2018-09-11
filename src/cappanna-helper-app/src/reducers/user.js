import { SIGNIN_COMPLETED, SIGNOUT_COMPLETED } from "actions/types";

const initialState = {
  userId: null,
  username: null,
  token: "",
  roles: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SIGNIN_COMPLETED:
      return {
        userId: action.payload.userId,
        username: action.payload.username,
        token: action.payload.token,
        roles: action.payload.roles
      };

    case SIGNOUT_COMPLETED:
      return initialState;

    default:
      return state;
  }
}
