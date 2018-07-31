import dashboard from "routes/dashboard";
import newUser from "routes/users/new";
import menu from "routes/menu";
import orders from "routes/orders/list";
import newOrder from "routes/orders/new/new";
import confirmNewOrder from "routes/orders/new/confirm";
import order from "routes/orders/detail";
import editOrder from "routes/orders/edit";
import confirmEditedOrder from "routes/orders/new/confirm";
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
  confirmNewOrder,
  order,
  editOrder,
  confirmEditedOrder,
  calculator,
  notifications,
  signin,
  signout,
  signupOk,
  redirect
];

export default appRoutes;
