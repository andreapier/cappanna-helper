import { SIGNIN_COMPLETED, SIGNOUT_COMPLETED } from "actions/types";

const initialStatus = {
  userId: null,
  username: null,
  token: null,
  roles: []
};

export default function(state = initialStatus, action) {
  switch (action.type) {
    case SIGNIN_COMPLETED:
      return {
        userId: action.payload.userId,
        username: action.payload.username,
        token: action.payload.token,
        roles: action.payload.roles
      };

    case SIGNOUT_COMPLETED:
      return initialStatus;

    default:
      return state;
  }
}
