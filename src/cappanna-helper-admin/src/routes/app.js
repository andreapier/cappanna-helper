import DashboardPage from "views/Dashboard/Dashboard.jsx";
import UserProfile from "views/UserProfile/UserProfile.jsx";
import OrderList from "views/OrderList/OrderList.jsx";
import Typography from "views/Typography/Typography.jsx";
import Icons from "views/Icons/Icons.jsx";
import NotificationsPage from "views/Notifications/Notifications.jsx";
import SignIn from "views/SignIn";
import {
  Dashboard,
  Person,
  ContentPaste,
  LibraryBooks,
  BubbleChart,
  Notifications,
  Input
} from "material-ui-icons";
import OutputIcon from './../components/OutputIcon';

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
    path: "/user",
    sidebarName: "User Profile",
    icon: Person,
    component: UserProfile,
    protected: true,
    name: 'user'
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
    path: "/typography",
    sidebarName: "Typography",
    icon: LibraryBooks,
    component: Typography,
    protected: true,
    name: 'typography'
  },
  {
    path: "/icons",
    sidebarName: "Icons",
    icon: BubbleChart,
    component: Icons,
    protected: true,
    name: 'icons'
  },
  {
    path: "/notifications",
    sidebarName: "Notifications",
    icon: Notifications,
    component: NotificationsPage,
    protected: true,
    name: 'notifications'
  },
  {
    path: "/signin",
    sidebarName: "Entra",
    icon: Input,
    component: SignIn,
    protected: false,
    name: 'signin'
  },
  {
    path: "/signout",
    sidebarName: "Esci",
    icon: OutputIcon,
    component: SignIn,
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
