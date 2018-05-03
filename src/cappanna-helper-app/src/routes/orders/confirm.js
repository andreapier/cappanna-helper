import OrderConfirmationPage from "views/OrderConfirmation";

const confirmOrder = {
  path: "/order/confirm",
  component: OrderConfirmationPage,
  protected: true,
  name: "order-confirm",
  headerTitle: "Conferma ordine"
};

export default confirmOrder;
