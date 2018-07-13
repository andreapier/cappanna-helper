import LoadablePage from "components/LoadablePage";

const AsyncCalculator = LoadablePage(() => import("views/Calculator"));

export default AsyncCalculator;
