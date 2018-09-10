import LoadablePage from "components/LoadablePage";

const AsyncOrderDetailsAggregate = LoadablePage(() =>
  import("views/OrderDetailsAggregate")
);

export default AsyncOrderDetailsAggregate;
