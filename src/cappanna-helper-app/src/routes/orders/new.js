import AsyncNewOrder from "views/NewOrder/AsyncNewOrder";
import { Add } from "@material-ui/icons";

const newOrder = {
  path: "/order/new",
  sidebarName: "Nuovo ordine",
  icon: Add,
  component: AsyncNewOrder,
  protected: true,
  name: "order-new",
  headerTitle: "Nuovo ordine"
};

export default newOrder;
