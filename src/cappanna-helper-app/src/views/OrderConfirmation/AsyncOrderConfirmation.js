import LoadablePage from "components/LoadablePage";

const AsyncOrderConfirmation = LoadablePage(() =>
  import("views/OrderConfirmation")
);

export default AsyncOrderConfirmation;
