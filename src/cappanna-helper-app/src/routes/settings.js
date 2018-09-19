import AsyncSettings from "views/Settings/AsyncSettings";
import Settings from "@material-ui/icons/Settings";

const settings = {
  path: "/settings",
  sidebarName: "Impostazioni",
  icon: Settings,
  component: AsyncSettings,
  protected: true,
  name: "settings",
  headerTitle: "Impostazioni",
  roles: ["admin"]
};

export default settings;
