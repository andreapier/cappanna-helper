import AsyncSignUpOk from "views/SignUpOk/AsyncSignUpOk";

const signupOk = {
  path: "/users/signup/ok",
  component: AsyncSignUpOk,
  protected: true,
  name: "signupOk",
  headerTitle: "Esito registrazione"
};

export default signupOk;
