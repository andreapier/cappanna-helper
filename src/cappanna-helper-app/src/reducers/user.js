import { SIGNIN_COMPLETED, SIGNOUT_COMPLETED } from "actions/types";

const initialState = {
  userId: null,
  username: null,
  token: "",
  roles: [],
  settings: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SIGNIN_COMPLETED:
      return {
        userId: action.payload.userId,
        username: action.payload.username,
        token: action.payload.token,
        roles: action.payload.roles,
        settings: action.payload.settings
      };

    case SIGNOUT_COMPLETED:
      return initialState;

    default:
      return state;
  }
}
