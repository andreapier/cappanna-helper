import { LOAD_ORDER_COMPLETED } from "actions/types";

const initialStatus = null;

export default function(state = initialStatus, action) {
  switch (action.type) {
    case LOAD_ORDER_COMPLETED:
      return { ...action.payload };

    default:
      return state;
  }
}
