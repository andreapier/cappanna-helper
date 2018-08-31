import { createSelector } from "reselect";

const selectedOrderDetailsSelector = state => state.selectedOrder.item.details;
const menuDetailsSelector = state => state.menuDetailsSelector.items;

const buildFilledOrderDetails = (orderDetails, menuDetails) => orderDetails
  .map(e => {
    const menuDetail = menuDetails.find(d => d.id === e.itemId);

    return {
      ...e,
      subtotal: e.quantity * menuDetail.price,
      item: {
        ...menuDetail
      }
    };
  });

export default buildFilledOrderDetails;