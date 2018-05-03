import SignInPage from "views/SignIn";
import { Input } from "@material-ui/icons";

const signin = {
  path: "/signin",
  sidebarName: "Entra",
  icon: Input,
  component: SignInPage,
  protected: false,
  name: "signin",
  headerTitle: "Entra"
};

export default signin;
