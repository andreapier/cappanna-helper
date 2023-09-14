import React from "react";
import PropTypes from "prop-types";
import Table from "components/Table";
import { formatAmount } from "utils/string";
import Print from "@material-ui/icons/Print";
import IconButton from "components/CustomButtons/IconButton";

const buildTableRow = (notification, printRequested) => [
    notification.orderId,
    notification.username,
    formatAmount(notification.totalPrice, false),
    <IconButton onClick={() => printRequested(notification.orderId)}>
        <Print />
    </IconButton>
];

const ToBePrintedOrdersNotifications = (props) => {
    return <Table tableHead={["Id", "Cameriere", "Totale (€)", "Stampa"]} tableData={props.notifications.map((n) => buildTableRow(n, props.printRequested))} />;
};

ToBePrintedOrdersNotifications.propTypes = {
    notifications: PropTypes.arrayOf(
        PropTypes.shape({
            orderId: PropTypes.number.isRequired,
            totalPrice: PropTypes.number.isRequired,
            username: PropTypes.string.isRequired
        })
    ).isRequired,
    printRequested: PropTypes.func.isRequired
};

export default ToBePrintedOrdersNotifications;
