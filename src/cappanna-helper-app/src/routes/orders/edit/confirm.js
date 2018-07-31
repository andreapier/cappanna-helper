import AsyncOrderConfirmation from "views/OrderConfirmation/AsyncOrderConfirmation";

const confirmOrder = {
  path: "/order/:id/edit/confirm",
  component: AsyncOrderConfirmation,
  protected: true,
  name: "order-confirm",
  headerTitle: "Conferma ordine",
  roles: ["waiter", "admin"]
};

export default confirmOrder;
