import DashboardPage from "views/Dashboard/Dashboard.jsx";
import UserProfile from "views/UserProfile/UserProfile.jsx";
import OrderList from "views/OrderList/OrderList.jsx";
import Typography from "views/Typography/Typography.jsx";
import Icons from "views/Icons/Icons.jsx";
import NotificationsPage from "views/Notifications/Notifications.jsx";
import SignIn from "views/SignIn/SignIn";

import {
  Dashboard,
  Person,
  ContentPaste,
  LibraryBooks,
  BubbleChart,
  Notifications,
  Input
} from "material-ui-icons";

const appRoutes = [
  {
    path: "/dashboard",
    sidebarName: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    protected: true
  },
  {
    path: "/user",
    sidebarName: "User Profile",
    icon: Person,
    component: UserProfile,
    protected: true
  },
  {
    path: "/orders",
    sidebarName: "Ordini",
    icon: ContentPaste,
    component: OrderList,
    protected: true
  },
  {
    path: "/typography",
    sidebarName: "Typography",
    icon: LibraryBooks,
    component: Typography,
    protected: true
  },
  {
    path: "/icons",
    sidebarName: "Icons",
    icon: BubbleChart,
    component: Icons,
    protected: true
  },
  {
    path: "/notifications",
    sidebarName: "Notifications",
    icon: Notifications,
    component: NotificationsPage,
    protected: true
  },
  {
    path: "/signin",
    sidebarName: "Entra",
    icon: Input,
    component: SignIn,
    protected: false
  },
  { redirect: true, path: "/", to: "/dashboard" }
];

export default appRoutes;
