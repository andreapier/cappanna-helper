import OrderListPage from "views/OrderList";
import NewOrderPage from "views/NewOrder";
import OrderConfirmationPage from "views/OrderConfirmation";
import OrderPage from "views/Order";
import CalculatorPage from "views/Calculator";
import SignInPage from "views/SignIn";
import SignOutPage from "views/SignOut";
import { List, Add, Apps, Input } from "@material-ui/icons";
import OutputIcon from "components/OutputIcon";

const appRoutes = [
  {
    path: "/orders",
    sidebarName: "Ordini",
    icon: List,
    component: OrderListPage,
    protected: true,
    name: "orders"
  },
  {
    path: "/order/new",
    sidebarName: "Nuovo ordine",
    icon: Add,
    component: NewOrderPage,
    protected: true,
    name: "order-new"
  },
  {
    path: "/order/confirm",
    component: OrderConfirmationPage,
    protected: true,
    name: "order-confirm"
  },
  {
    path: "/order/:id",
    component: OrderPage,
    protected: true,
    name: "order"
  },
  {
    path: "/calc",
    sidebarName: "Calcolatrice",
    icon: Apps,
    component: CalculatorPage,
    name: "calculator"
  },
  {
    path: "/signin",
    sidebarName: "Entra",
    icon: Input,
    component: SignInPage,
    protected: false,
    name: "signin"
  },
  {
    path: "/signout",
    sidebarName: "Esci",
    icon: OutputIcon,
    component: SignOutPage,
    protected: true,
    name: "signout"
  },
  {
    redirect: true,
    path: "/",
    to: "/orders"
  }
];

export default appRoutes;
