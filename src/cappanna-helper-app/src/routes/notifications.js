import AsyncNotifications from "views/Notifications/AsyncNotifications";
import Notifications from "@mui/icons-material/Notifications";

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
