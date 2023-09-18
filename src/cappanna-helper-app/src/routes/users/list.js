import AsyncUserList from "views/UserList/AsyncUserList";
import Person from "@mui/icons-material/Person";

const orders = {
    path: "/user",
    sidebarName: "Utenti",
    icon: Person,
    component: AsyncUserList,
    protected: true,
    name: "users",
    headerTitle: "Utenti",
    roles: ["admin"]
};

export default orders;
