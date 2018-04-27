import DashboardPage from "views/Dashboard";
import { Dashboard } from "@material-ui/icons";

const dashboard = {
  path: "/dashboard",
  sidebarName: "Dashboard",
  icon: Dashboard,
  component: DashboardPage,
  protected: true,
  name: "dashboard"
};

export default dashboard;
