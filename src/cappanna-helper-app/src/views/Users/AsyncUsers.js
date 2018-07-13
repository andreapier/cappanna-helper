import LoadablePage from "components/LoadablePage";

const AsyncUsers = LoadablePage(() => import("views/Users"));

export default AsyncUsers;
