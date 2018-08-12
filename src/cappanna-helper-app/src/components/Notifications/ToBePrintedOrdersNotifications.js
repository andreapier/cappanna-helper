import React from "react";
import PropTypes from "prop-types";
import Table from "components/Table";
import { formatAmount } from "utils/string";
import Print from "@material-ui/icons/Print";
import IconButton from "components/CustomButtons/IconButton";

const buildTableRow = (notification, printRequested)  => [
  notification.orderId,
  formatAmount(notification.totalPrice, false),
  (<IconButton onClick={() => printRequested(notification.orderId)}>
    <Print />
  </IconButton>)
];

const ToBePrintedOrdersNotifications = props => {
  return (
    <Table
        tableHead={["Id", "Totale (€)", "Stampa"]}
        tableData={props.notifications.map(n => buildTableRow(n,  props.printRequested))}
      />
  );
};

ToBePrintedOrdersNotifications.propTypes = {
  notifications: PropTypes.arrayOf(PropTypes.shape({
    orderId: PropTypes.number.isRequired,
    totalPrice: PropTypes.number.isRequired
  })).isRequired,
  printRequested: PropTypes.func.isRequired
};

export default ToBePrintedOrdersNotifications;
