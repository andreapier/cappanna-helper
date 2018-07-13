import AsyncOrderConfirmation from "views/OrderConfirmation/AsyncOrderConfirmation";

const confirmOrder = {
  path: "/order/confirm",
  component: AsyncOrderConfirmation,
  protected: true,
  name: "order-confirm",
  headerTitle: "Conferma ordine"
};

export default confirmOrder;
