import AsyncMenu from "views/Menu/AsyncMenu";
import { LibraryBooks } from "@material-ui/icons";

const menu = {
  path: "/menu",
  sidebarName: "Menu",
  icon: LibraryBooks,
  component: AsyncMenu,
  protected: true,
  name: "menu",
  headerTitle: "Menu"
};

export default menu;
