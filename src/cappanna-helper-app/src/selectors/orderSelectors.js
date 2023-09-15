import { createSelector } from "reselect";
import calculateOrderTotalPrice from "utils/calculateOrderTotalPrice";

const selectCanConfirmOrder = state => {
  return state.newOrderHeader.totalPrice > 0 &&
    !!state.newOrderHeader.chTable &&
    !!state.newOrderHeader.customer &&
    state.newOrderHeader.seats > 0 &&
    state.user.settings.standId > 0 &&
    !state.newOrderDetails
        .filter((d) => d.quantity > 0)
        .some((d) => {
            const menuDetail = state.menuDetails.find((m) => m.id === d.itemId);
            return menuDetail.unitsInStock + d.initialQuantity < d.quantity;
        });
}

const makeSelectOrderItemsByItemId = () => {
  return createSelector(
    [state => state.newOrderDetails, (state, itemId) => itemId],
    (newOrderDetails, itemId) => newOrderDetails.find(item => item.itemId === itemId)
  )
}

const selectOrderTotalPrice = state => {
  return state.selectedOrder ? calculateOrderTotalPrice(state.selectedOrder) : 0;
}

export { makeSelectOrderItemsByItemId, selectCanConfirmOrder, selectOrderTotalPrice };