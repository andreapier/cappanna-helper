import React from "react";
import PropTypes from "prop-types";
import ToBePrintedOrdersNotifications from "components/Notifications/ToBePrintedOrdersNotifications"

const Notifications = props => {
  const toBePrintedOrdersNotifications = props.notifications.filter(n => n.type === "order");

  return ([
    <ToBePrintedOrdersNotifications
      notifications={toBePrintedOrdersNotifications}
      printRequested={props.printRequested}
      key={1} />
  ]);
};

Notifications.propTypes = {
  notifications: PropTypes.array.isRequired,
  printRequested: PropTypes.func.isRequired
};

export default Notifications;
