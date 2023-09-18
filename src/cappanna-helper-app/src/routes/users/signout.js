import AsyncSignOut from "views/SignOut/AsyncSignOut";
import OutputIcon from "components/OutputIcon";

const signout = {
    path: "/signout",
    sidebarName: "Esci",
    icon: OutputIcon,
    component: AsyncSignOut,
    protected: true,
    name: "signout",
    headerTitle: "Bevi poco",
    roles: ["waiter", "admin", "dome", "cashier"]
};

export default signout;
