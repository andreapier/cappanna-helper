import AsyncOrderList from "views/OrderList/AsyncOrderList";
import LibraryBooks from "@mui/icons-material/LibraryBooks";

const orders = {
    path: "/order",
    sidebarName: "Ordini",
    icon: LibraryBooks,
    component: AsyncOrderList,
    protected: true,
    name: "orders",
    headerTitle: "Ordini",
    roles: ["waiter", "admin", "dome", "cashier"]
};

export default orders;
