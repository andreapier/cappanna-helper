import AsyncSignIn from "views/SignIn/AsyncSignIn";
import { Input } from "@material-ui/icons";

const signin = {
  path: "/signin",
  sidebarName: "Entra",
  icon: Input,
  component: AsyncSignIn,
  name: "signin",
  headerTitle: "Entra",
  roles: []
};

export default signin;
