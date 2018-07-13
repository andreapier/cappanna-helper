import LoadablePage from "components/LoadablePage";

const AsyncOrder = LoadablePage(() => import("views/Order"));

export default AsyncOrder;
