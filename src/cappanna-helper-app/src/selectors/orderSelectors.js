import { createSelector } from "reselect";

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
  );
}

const selectFilteredOrders = createSelector(
  [
    state => state.orders.items,
    state => state.orders.filters,
    state => state.user
  ],
  (items, filters, user) => items.filter(o => {
    if (filters.user) {
      return o.createdById === user.userId;
    }

    if (filters.stand) {
      return o.standId === user.settings.standId;
    }

    if (filters.status) {
      return o.status < 4;
    }

    return true;
  })
);

const selectOrderTotalPrice = createSelector(
  [state => state.selectedOrder],
  order => order ? order.details.reduce((acc, e) => acc + e.quantity * e.item.price, 0) : 0
);

export { makeSelectOrderItemsByItemId, selectCanConfirmOrder, selectFilteredOrders, selectOrderTotalPrice };