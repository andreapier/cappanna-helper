import Menu from "views/Menu";
import { LibraryBooks } from "@material-ui/icons";

const menu = {
  path: "/menu",
  sidebarName: "Menu",
  icon: LibraryBooks,
  component: Menu,
  protected: true,
  name: "menu",
  headerTitle: "Menu"
};

export default menu;
