import AsyncOrderList from "views/OrderList/AsyncOrderList";
import { List } from "@material-ui/icons";

const orders = {
  path: "/order",
  sidebarName: "Ordini",
  icon: List,
  component: AsyncOrderList,
  protected: true,
  name: "orders",
  headerTitle: "Ordini"
};

export default orders;
