import { SIGNIN_COMPLETED, SIGNOUT_COMPLETED } from "actions/types";

export default function(state = null, action) {
  switch (action.type) {
    case SIGNIN_COMPLETED:
      return { ...action.payload };

    case SIGNOUT_COMPLETED:
      return null;

    default:
      return state;
  }
}
