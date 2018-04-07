import DashboardPage from "views/Dashboard/Dashboard.jsx";
import Users from "views/Users";
import OrderList from "views/OrderList/OrderList.jsx";
import Menu from "views/Menu";
import NotificationsPage from "views/Notifications";
import SignInPage from "views/SignIn";
import SignOutPage from "views/SignOut";
import {
  Dashboard,
  Person,
  ContentPaste,
  LibraryBooks,
  Notifications,
  Input
} from "material-ui-icons";
import OutputIcon from 'components/OutputIcon';

const appRoutes = [
  {
    path: "/dashboard",
    sidebarName: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    protected: true,
    name: 'dashboard'
  },
  {
    path: "/users",
    sidebarName: "Utenti",
    icon: Person,
    component: Users,
    protected: true,
    name: 'users'
  },
  {
    path: "/orders",
    sidebarName: "Ordini",
    icon: ContentPaste,
    component: OrderList,
    protected: true,
    name: 'orders'
  },
  {
    path: "/menu",
    sidebarName: "Menu",
    icon: LibraryBooks,
    component: Menu,
    protected: true,
    name: 'menu'
  },
  {
    path: "/notifications",
    sidebarName: "Notifiche",
    icon: Notifications,
    component: NotificationsPage,
    protected: true,
    name: 'notifications'
  },
  {
    path: "/signin",
    sidebarName: "Entra",
    icon: Input,
    component: SignInPage,
    protected: false,
    name: 'signin'
  },
  {
    path: "/signout",
    sidebarName: "Esci",
    icon: OutputIcon,
    component: SignOutPage,
    protected: true,
    name: 'signout'
  },
  {
    redirect: true,
    path: "/",
    to: "/dashboard"
  }
];

export default appRoutes;
