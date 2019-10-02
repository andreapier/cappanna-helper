import {
  LOAD_NOTIFICATIONS_LIST_COMPLETED,
  ORDER_CREATED,
  ORDER_CHANGED,
  ORDER_PRINTED,
  ORDER_DELETED,
  SIGNOUT_COMPLETED
} from "actions/types";
import calculateOrderTotalPrice from "utils/calculateOrderTotalPrice";

const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case LOAD_NOTIFICATIONS_LIST_COMPLETED:
      return action.payload;

    case SIGNOUT_COMPLETED:
      return initialState;

    case ORDER_CREATED:
      return state.concat([
        {
          type: "ORDER",
          orderId: action.payload.id,
          totalPrice: calculateOrderTotalPrice(action.payload),
          username: action.payload.createdBy.userName
        }
      ]);

    case ORDER_CHANGED:
      const found = state.find(
        n => n.type === "ORDER" && n.orderId === action.payload.id
      );

      return found
        ? state.map(n => {
            if (n.orderId === action.payload.id) {
              return {
                orderId: action.payload.id,
                type: n.type,
                totalPrice: calculateOrderTotalPrice(action.payload),
                username: n.username
              };
            }

            return n;
          })
        : state.concat([
            {
              orderId: action.payload.id,
              type: "ORDER",
              totalPrice: calculateOrderTotalPrice(action.payload),
              username: action.payload.createdBy.userName
            }
          ]);

    case ORDER_PRINTED:
    case ORDER_DELETED:
      return state.filter(n => {
        if (n.type !== "ORDER") {
          return true;
        }

        if (n.orderId !== action.payload.id) {
          return true;
        }

        return false;
      });

    default:
      return state;
  }
}
