import { LOGIN_COMPLETED, LOGOUT_COMPLETED } from "./../actions/types";

export default function(state = null, action) {
  switch (action.type) {
    case LOGIN_COMPLETED:
      return { ...action.payload };

    case LOGOUT_COMPLETED:
      return null;

    default:
      return state;
  }
}
