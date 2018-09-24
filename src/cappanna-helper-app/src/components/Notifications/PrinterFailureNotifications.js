import React from "react";
import PropTypes from "prop-types";
import Table from "components/Table";
import Print from "@material-ui/icons/Print";
import IconButton from "components/CustomButtons/IconButton";

const buildTableRow = (notification, completeNotification)  => [
  notification.printerStatus.details.join(),
  (<IconButton onClick={() => completeNotification(notification.id)}>
    <Print />
  </IconButton>)
];

const PrinterFailureNotifications = props => {
  return (
    <Table
        tableHead={["Messaggio", "Dettagli"]}
        tableData={props.notifications.map(n => buildTableRow(n,  props.printRequested))}
      />
  );
};

PrinterFailureNotifications.propTypes = {
  notifications: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    printerStatus: PropTypes.shape({
      details: PropTypes.object.isRequired
    }).isRequired
  })).isRequired,
  completeNotification: PropTypes.func.isRequired
};

export default PrinterFailureNotifications;
