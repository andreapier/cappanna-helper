import DashboardPage from "views/Dashboard/Dashboard.jsx";
import UserProfile from "views/UserProfile/UserProfile.jsx";
import TableList from "views/TableList/TableList.jsx";
import Typography from "views/Typography/Typography.jsx";
import Icons from "views/Icons/Icons.jsx";
import Maps from "views/Maps/Maps.jsx";
import NotificationsPage from "views/Notifications/Notifications.jsx";

import {
  Dashboard,
  Person,
  ContentPaste,
  LibraryBooks,
  BubbleChart,
  LocationOn,
  Notifications
} from "material-ui-icons";

const appRoutes = [
  {
    path: "/dashboard",
    sidebarName: "Dashboard",
    icon: Dashboard,
    component: DashboardPage
  },
  {
    path: "/user",
    sidebarName: "User Profile",
    icon: Person,
    component: UserProfile
  },
  {
    path: "/table",
    sidebarName: "Table List",
    icon: ContentPaste,
    component: TableList
  },
  {
    path: "/typography",
    sidebarName: "Typography",
    icon: LibraryBooks,
    component: Typography
  },
  {
    path: "/icons",
    sidebarName: "Icons",
    icon: BubbleChart,
    component: Icons
  },
  {
    path: "/maps",
    sidebarName: "Maps",
    icon: LocationOn,
    component: Maps
  },
  {
    path: "/notifications",
    sidebarName: "Notifications",
    icon: Notifications,
    component: NotificationsPage
  },
  { redirect: true, path: "/", to: "/dashboard" }
];

export default appRoutes;
