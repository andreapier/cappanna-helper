import {
  LOAD_ORDER_COMPLETED,
  SET_ORDER_STATUS_COMPLETED
} from "actions/types";

const initialStatus = null;

export default function(state = initialStatus, action) {
  switch (action.type) {
    case LOAD_ORDER_COMPLETED:
    case SET_ORDER_STATUS_COMPLETED:
      return { ...action.payload };

    default:
      return state;
  }
}
