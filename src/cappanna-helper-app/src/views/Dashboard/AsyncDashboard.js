import LoadablePage from "components/LoadablePage";

const AsyncDashboard = LoadablePage(() => import("views/Dashboard"));

export default AsyncDashboard;
