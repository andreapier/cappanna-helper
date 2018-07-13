import AsyncDashboard from "views/Dashboard/AsyncDashboard";
import { Dashboard } from "@material-ui/icons";

const dashboard = {
  path: "/dashboard",
  sidebarName: "Dashboard",
  icon: Dashboard,
  component: AsyncDashboard,
  protected: true,
  name: "dashboard",
  headerTitle: "Dashboard"
};

export default dashboard;
