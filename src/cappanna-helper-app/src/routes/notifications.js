import AsyncNotifications from "views/Notifications/AsyncNotifications";
import { Notifications } from "@material-ui/icons";

const notifications = {
  path: "/notifications",
  sidebarName: "Notifiche",
  icon: Notifications,
  component: AsyncNotifications,
  protected: true,
  name: "notifications",
  headerTitle: "Notifiche",
  roles: ["admin"]
};

export default notifications;
