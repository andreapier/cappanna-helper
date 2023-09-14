const calculateOrderTotalPrice = (order) => order.details.reduce((acc, e) => acc + e.quantity * e.item.price, 0);

export default calculateOrderTotalPrice;
