import NewOrderPage from "views/NewOrder";
import { Add } from "@material-ui/icons";

const newOrder = {
  path: "/order/new",
  sidebarName: "Nuovo ordine",
  icon: Add,
  component: NewOrderPage,
  protected: true,
  name: "order-new",
  headerTitle: "Nuovo ordine"
};

export default newOrder;
