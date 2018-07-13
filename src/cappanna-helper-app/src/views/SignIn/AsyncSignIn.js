import LoadablePage from "components/LoadablePage";

const AsyncSignIn = LoadablePage(() => import("views/SignIn"));

export default AsyncSignIn;
