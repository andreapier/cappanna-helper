import AsyncOrder from "views/Order/AsyncOrder";

const order = {
  path: "/order/:id",
  component: AsyncOrder,
  protected: true,
  name: "order",
  headerTitle: "Ordine",
  roles: ["waiter", "admin", "dome"]
};

export default order;
