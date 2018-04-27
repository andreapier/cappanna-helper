import dashboard from "routes/dashboard";
import newUser from "routes/users/new";
import menu from "routes/menu";
import orders from "routes/orders/list";
import newOrder from "routes/orders/new";
import confirmOrder from "routes/orders/confirm";
import order from "routes/orders/detail";
import calculator from "routes/calculator";
import notifications from "routes/notifications";
import signin from "routes/users/signin";
import signout from "routes/users/signout";
import signupOk from "routes/users/signupOk";
import redirect from "routes/redirect";

const appRoutes = [
  dashboard,
  newUser,
  menu,
  orders,
  newOrder,
  confirmOrder,
  order,
  calculator,
  notifications,
  signin,
  signout,
  signupOk,
  redirect
];

export default appRoutes;
