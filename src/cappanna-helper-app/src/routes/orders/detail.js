import AsyncOrder from "views/Order/AsyncOrder";

const order = {
  path: "/order/:id",
  component: AsyncOrder,
  protected: true,
  name: "order",
  headerTitle: "Ordine"
};

export default order;
