import { SIGNIN_COMPLETED, SIGNOUT_COMPLETED } from "actions/types";

const initialStatus = {
  username: null,
  token: null,
  roles: []
};

export default function(state = initialStatus, action) {
  switch (action.type) {
    case SIGNIN_COMPLETED:
      return {
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
