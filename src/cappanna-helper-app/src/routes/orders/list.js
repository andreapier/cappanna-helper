import OrderListPage from "views/OrderList";
import { List } from "@material-ui/icons";

const orders = {
  path: "/orders",
  sidebarName: "Ordini",
  icon: List,
  component: OrderListPage,
  protected: true,
  name: "orders",
  headerTitle: "Ordini"
};

export default orders;
