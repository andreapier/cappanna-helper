import AsyncOrderList from "views/OrderList/AsyncOrderList";
import LibraryBooks from "@material-ui/icons/LibraryBooks";

const orders = {
  path: "/order",
  sidebarName: "Ordini",
  icon: LibraryBooks,
  component: AsyncOrderList,
  protected: true,
  name: "orders",
  headerTitle: "Ordini",
  roles: ["waiter", "admin", "dome"]
};

export default orders;
