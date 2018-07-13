import LoadablePage from "components/LoadablePage";

const AsyncSignUpOk = LoadablePage(() => import("views/SignUpOk"));

export default AsyncSignUpOk;
