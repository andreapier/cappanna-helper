import OrderPage from "views/Order";

const order = {
  path: "/order/:id",
  component: OrderPage,
  protected: true,
  name: "order"
};

export default order;
