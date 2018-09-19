import LoadablePage from "components/LoadablePage";

const AsyncSettings = LoadablePage(() => import("views/Settings"));

export default AsyncSettings;
