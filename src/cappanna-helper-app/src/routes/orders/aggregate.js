import AsyncOrderDetailsAggregate from "views/OrderDetailsAggregate/AsyncOrderDetailsAggregate";
import Assignment from "@mui/icons-material/Assignment";

const orderDetailsAggregate = {
    path: "/aggregate",
    sidebarName: "Conteggio piatti",
    icon: Assignment,
    component: AsyncOrderDetailsAggregate,
    protected: true,
    name: "order-details-aggregator",
    headerTitle: "Conteggio piatti",
    roles: ["admin", "dome"]
};

export default orderDetailsAggregate;
