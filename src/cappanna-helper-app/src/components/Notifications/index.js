import React from "react";
import PropTypes from "prop-types";
import ToBePrintedOrdersNotifications from "components/Notifications/ToBePrintedOrdersNotifications"
import PrinterFailureNotifications from "components/Notifications/PrinterFailureNotifications"

const Notifications = props => {
  const toBePrintedOrdersNotifications = props.notifications.filter(n => n.type === "ORDER");
  const printerFailureNotifications = props.notifications.filter(n => n.type === "PRINTER_FAILURE");

  return ([
    <ToBePrintedOrdersNotifications
      notifications={toBePrintedOrdersNotifications}
      printRequested={props.printRequested}
      key={1} />,
    <PrinterFailureNotifications
      notifications={printerFailureNotifications}
      completeNotification={props.completeNotification}
      key={2} />
  ]);
};

Notifications.propTypes = {
  notifications: PropTypes.array.isRequired,
  printRequested: PropTypes.func.isRequired,
  completeNotification: PropTypes.func.isRequired
};

export default Notifications;
