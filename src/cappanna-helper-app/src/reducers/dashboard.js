import {
  LOAD_DASHBOARD_DATA_REQUESTED,
  LOAD_DASHBOARD_DATA_COMPLETED,
  INVALIDATE_DASHBOARD_DATA,
  ORDER_CREATED,
  ORDER_DELETED,
  SIGNOUT_COMPLETED
} from "actions/types";
import calculateOrderTotalPrice from "utils/calculateOrderTotalPrice";

export const initialState = {
  loading: false,
  loaded: false,
  data: {
    waitersStats: [],
    ordersQuantity: 0,
    income: 0
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOAD_DASHBOARD_DATA_REQUESTED:
      return {
        ...state,
        loading: true,
        loaded: false
      };
      
    case LOAD_DASHBOARD_DATA_COMPLETED:
      return {
        loading: false,
        loaded: true,
        data: {
          ...action.payload
        }
      };

    case INVALIDATE_DASHBOARD_DATA:
    case SIGNOUT_COMPLETED:
      return initialState;

    case ORDER_CREATED: {
      const totalPrice = calculateOrderTotalPrice(action.payload);

      return {
        ...state,
        data: {
          waitersStats: [
            ...state.data.waitersStats.filter(s => s.userId === action.payload.createdById).map(s => ({
              ordersQuantity: s.ordersQuantity + 1,
              income: s.income + totalPrice
            })),
            ...state.data.waitersStats.filter(s => s.userId !== action.payload.createdById)
          ],
          ordersQuantity: state.data.ordersQuantity + 1,
          income: state.data.income + totalPrice
        }
      };
    }
      
    case ORDER_DELETED: {
      const totalPrice = calculateOrderTotalPrice(action.payload);

      return {
        ...state,
        data: {
          waitersStats: [
            ...state.data.waitersStats.filter(s => s.userId === action.payload.createdById).map(s => ({
              ordersQuantity: s.ordersQuantity - 1,
              income: s.income - totalPrice
            })),
            ...state.data.waitersStats.filter(s => s.userId !== action.payload.createdById)
          ],
          ordersQuantity: state.data.ordersQuantity - 1,
          income: state.data.income - totalPrice
        }
      };
    }

    default:
      return state;
  }
}
