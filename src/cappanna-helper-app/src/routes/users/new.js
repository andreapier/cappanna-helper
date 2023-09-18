import AsyncUsers from "views/Users/AsyncUsers";
import Person from "@mui/icons-material/Person";

const users = {
    path: "/users/new",
    sidebarName: "Utenti",
    icon: Person,
    component: AsyncUsers,
    protected: true,
    name: "users",
    headerTitle: "Nuovo utente",
    roles: ["admin"]
};

export default users;
