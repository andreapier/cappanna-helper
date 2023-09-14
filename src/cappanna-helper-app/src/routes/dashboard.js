import AsyncDashboard from "views/Dashboard/AsyncDashboard";
import Dashboard from "@material-ui/icons/Dashboard";

const dashboard = {
    path: "/dashboard",
    sidebarName: "Dashboard",
    icon: Dashboard,
    component: AsyncDashboard,
    protected: true,
    name: "dashboard",
    headerTitle: "Dashboard",
    roles: ["admin"]
};

export default dashboard;
