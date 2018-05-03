import { Notifications } from "@material-ui/icons";
import NotificationsPage from "views/Notifications";

const notifications = {
  path: "/notifications",
  sidebarName: "Notifiche",
  icon: Notifications,
  component: NotificationsPage,
  protected: true,
  name: "notifications",
  headerTitle: "Notifiche"
};

export default notifications;
