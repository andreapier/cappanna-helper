import { LOAD_DASHBOARD_DATA_COMPLETED, ORDER_CREATED, ORDER_DELETED, SIGNOUT_COMPLETED } from "actions/types";
import calculateOrderTotalPrice from "utils/calculateOrderTotalPrice";

export const initialState = {
    waitersStats: [],
    orderStats: [],
    income: 0
};

const dashboard = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_DASHBOARD_DATA_COMPLETED:
            return action.payload;

        case SIGNOUT_COMPLETED:
            return initialState;

        case ORDER_CREATED: {
            const totalPrice = calculateOrderTotalPrice(action.payload);

            return {
                waitersStats: [
                    ...state.waitersStats
                        .filter((s) => s.userId === action.payload.createdById)
                        .map((s) => ({
                            ordersQuantity: s.ordersQuantity + 1,
                            income: s.income + totalPrice
                        })),
                    ...state.waitersStats.filter((s) => s.userId !== action.payload.createdById)
                ],
                orderStats: [
                    ...state.orderStats
                        .filter((s) => s.standId === action.payload.standId)
                        .map((s) => ({
                            ordersQuantity: s.ordersQuantity + 1,
                            income: s.income + totalPrice
                        })),
                    ...state.orderStats.filter((s) => s.standId !== action.payload.standId)
                ],
                income: state.income + totalPrice
            };
        }

        case ORDER_DELETED: {
            const totalPrice = calculateOrderTotalPrice(action.payload);

            return {
                waitersStats: [
                    ...state.waitersStats
                        .filter((s) => s.userId === action.payload.createdById)
                        .map((s) => ({
                            ordersQuantity: s.ordersQuantity - 1,
                            income: s.income - totalPrice
                        })),
                    ...state.waitersStats.filter((s) => s.userId !== action.payload.createdById)
                ],
                orderStats: [
                    ...state.orderStats
                        .filter((s) => s.standId === action.payload.standId)
                        .map((s) => ({
                            ordersQuantity: s.ordersQuantity - 1,
                            income: s.income - totalPrice
                        })),
                    ...state.orderStats.filter((s) => s.standId !== action.payload.standId)
                ],
                income: state.income - totalPrice
            };
        }

        default:
            return state;
    }
};

export default dashboard;