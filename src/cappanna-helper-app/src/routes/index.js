import OrderListPage from "views/OrderList";
import NewOrderPage from "views/NewOrder";
import OrderConfirmationPage from "views/OrderConfirmation";
import OrderPage from "views/Order";
import CalculatorPage from "views/Calculator";
import SignInPage from "views/SignIn";
import SignOutPage from "views/SignOut";
import {
  Dashboard,
  Person,
  ContentPaste,
  LibraryBooks,
  Notifications,
  List,
  Add,
  Apps,
  Input
} from "@material-ui/icons";
import OutputIcon from "components/OutputIcon";
import DashboardPage from "views/Dashboard";
import Users from "views/Users";
import Menu from "views/Menu";
import SignUpOkPage from "views/SignUpOk";
import NotificationsPage from "views/Notifications";

const appRoutes = [
  {
    path: "/dashboard",
    sidebarName: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    protected: true,
    name: "dashboard"
  },
  {
    path: "/users",
    sidebarName: "Utenti",
    icon: Person,
    component: Users,
    protected: true,
    name: "users"
  },
  {
    path: "/menu",
    sidebarName: "Menu",
    icon: LibraryBooks,
    component: Menu,
    protected: true,
    name: "menu"
  },
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
    path: "/notifications",
    sidebarName: "Notifiche",
    icon: Notifications,
    component: NotificationsPage,
    protected: true,
    name: "notifications"
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
    path: "/users/signup/ok",
    component: SignUpOkPage,
    protected: true,
    name: "signupOk"
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
