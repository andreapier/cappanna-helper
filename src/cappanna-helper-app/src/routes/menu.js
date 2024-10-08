import AsyncMenu from "views/Menu/AsyncMenu";
import List from "@mui/icons-material/List";

const menu = {
    path: "/menu",
    sidebarName: "Menu",
    icon: List,
    component: AsyncMenu,
    protected: true,
    name: "menu",
    headerTitle: "Menu",
    roles: ["waiter", "admin", "dome", "cashier"]
};

export default menu;
