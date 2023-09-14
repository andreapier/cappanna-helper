import AsyncOrderConfirmation from "views/OrderConfirmation/AsyncOrderConfirmation";

const confirmOrder = {
    path: "/order/new/confirm",
    component: AsyncOrderConfirmation,
    protected: true,
    name: "order-confirm",
    headerTitle: "Conferma ordine",
    roles: ["waiter", "admin", "cashier"]
};

export default confirmOrder;
