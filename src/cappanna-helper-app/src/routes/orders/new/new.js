import AsyncNewOrder from "views/NewOrder/AsyncNewOrder";
import Add from "@mui/icons-material/Add";

const newOrder = {
    path: "/order/new",
    sidebarName: "Nuovo ordine",
    icon: Add,
    component: AsyncNewOrder,
    protected: true,
    name: "order-new",
    headerTitle: "Nuovo ordine",
    roles: ["waiter", "admin", "cashier"]
};

export default newOrder;
