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