import LoadablePage from "components/LoadablePage";

const AsyncNotification = LoadablePage(() => import("views/Notifications"));

export default AsyncNotification;
