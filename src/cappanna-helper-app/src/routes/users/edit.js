import AsyncUser from "views/EditUser/AsyncUser";

const user = {
    path: "/user/:id",
    component: AsyncUser,
    protected: true,
    name: "user",
    headerTitle: "Utente",
    roles: ["admin"]
};

export default user;
