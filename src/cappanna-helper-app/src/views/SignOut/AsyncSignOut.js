import LoadablePage from "components/LoadablePage";

const AsyncSignOut = LoadablePage(() => import("views/SignOut"));

export default AsyncSignOut;
