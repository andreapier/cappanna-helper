import AsyncUsers from "views/Users/AsyncUsers";

const users = {
  path: "/users/new",
  component: AsyncUsers,
  protected: true,
  name: "users",
  headerTitle: "Nuovo utente",
  roles: ["admin"]
};

export default users;
