import LoadablePage from "components/LoadablePage";

const AsyncOrderList = LoadablePage(() => import("views/OrderList"));

export default AsyncOrderList;
