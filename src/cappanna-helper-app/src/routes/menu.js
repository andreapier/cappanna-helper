import AsyncMenu from "views/Menu/AsyncMenu";
import List from "@material-ui/icons/List";

const menu = {
  path: "/menu",
  sidebarName: "Menu",
  icon: List,
  component: AsyncMenu,
  protected: true,
  name: "menu",
  headerTitle: "Menu",
  roles: ["waiter", "admin", "dome"]
};

export default menu;
