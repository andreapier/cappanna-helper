import AsyncSignIn from "views/SignIn/AsyncSignIn";
import Input from "@mui/icons-material/Input";

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
