import AsyncNotifications from "views/Notifications/AsyncNotifications";
import Notifications from "@material-ui/icons/Notifications";

const notifications = {
    path: "/notifications",
    sidebarName: "Notifiche",
    icon: Notifications,
    component: AsyncNotifications,
    protected: true,
    name: "notifications",
    headerTitle: "Notifiche",
    roles: ["admin", "cashier"]
};

export default notifications;
