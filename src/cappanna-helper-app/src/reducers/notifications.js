import {
  LOAD_NOTIFICATIONS_LIST_REQUESTED,
  LOAD_NOTIFICATIONS_LIST_COMPLETED,
  INVALIDATE_NOTIFICATIONS_LIST,
  ORDER_CREATED,
  ORDER_CHANGED,
  ORDER_PRINTED
} from "actions/types";

const initialStatus = {
  loading: false,
  loaded: false,
  items: []
};

export default function(state = initialStatus, action) {
  switch (action.type) {
    case LOAD_NOTIFICATIONS_LIST_REQUESTED:
      return {
        loading: true,
        loaded: false,
        items: []
      };

    case LOAD_NOTIFICATIONS_LIST_COMPLETED:
      return {
        loading: false,
        loaded: true,
        items: action.payload
      };

    case INVALIDATE_NOTIFICATIONS_LIST:
      return initialStatus;

    case ORDER_CREATED:
      return {
        ...state,
        items: state.items.concat([{
          type: "order",
          orderId: action.payload.id,
          totalPrice: action.payload.details.reduce(
            (acc, e) => acc + e.quantity * e.item.price,
            0
          ),
          username: action.payload.createdBy.userName
        }])
      };

    case ORDER_CHANGED:
      const found = state.items.find(n => n.type === "order" && n.orderId === action.payload.id);

      return {
        ...state,
        items: found ? state.items
          .map(n => {
            if (n.orderId === action.payload.id) {
              return {
                orderId: action.payload.id,
                type: n.type,
                totalPrice: action.payload.details.reduce(
                  (acc, e) => acc + e.quantity * e.item.price,
                  0
                ),
                username: n.username
              };
            }

            return n;
          }) : 
          state.items.concat([{
            orderId: action.payload.id,
            type: "order",
            totalPrice: action.payload.details.reduce(
              (acc, e) => acc + e.quantity * e.item.price,
              0
            ),
            username: action.payload.createdBy.userName
          }])
      };

    case ORDER_PRINTED:
      return {
        ...state,
        items: state.items.filter(n => {
          if (n.type !== "order") {
            return true;
          }

          if (n.orderId !== action.payload.id) {
            return true;
          }

          return false;
        })
      };

    default:
      return state;
  }
}
