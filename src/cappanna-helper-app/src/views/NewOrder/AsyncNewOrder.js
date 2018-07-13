import LoadablePage from "components/LoadablePage";

const AsyncNewOrder = LoadablePage(() => import("views/NewOrder"));

export default AsyncNewOrder;
