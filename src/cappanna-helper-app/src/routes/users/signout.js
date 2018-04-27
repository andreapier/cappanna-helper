import SignOutPage from "views/SignOut";
import OutputIcon from "components/OutputIcon";

const signout = {
  path: "/signout",
  sidebarName: "Esci",
  icon: OutputIcon,
  component: SignOutPage,
  protected: true,
  name: "signout"
};

export default signout;
