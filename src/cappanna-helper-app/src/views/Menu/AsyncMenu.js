import LoadablePage from "components/LoadablePage";

const AsyncMenu = LoadablePage(() => import("views/Menu"));

export default AsyncMenu;
