import AsyncNewOrder from "views/NewOrder/AsyncNewOrder";

const order = {
    path: "/order/:id/edit",
    component: AsyncNewOrder,
    protected: true,
    name: "order",
    headerTitle: "Ordine",
    roles: ["waiter", "admin", "cashier"]
};

export default order;
