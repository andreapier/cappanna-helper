import AsyncUsers from "views/Users/AsyncUsers";
import { Person } from "@material-ui/icons";

const users = {
  path: "/users/new",
  sidebarName: "Utenti",
  icon: Person,
  component: AsyncUsers,
  protected: true,
  name: "users",
  headerTitle: "Nuovo utente"
};

export default users;
