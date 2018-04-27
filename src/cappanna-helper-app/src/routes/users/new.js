import Users from "views/Users";
import { Person } from "@material-ui/icons";

const users = {
  path: "/users/new",
  sidebarName: "Utenti",
  icon: Person,
  component: Users,
  protected: true,
  name: "users"
};

export default users;
