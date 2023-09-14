import React from "react";
import PropTypes from "prop-types";
import Table from "components/Table";
import { formatAmount } from "utils/string";

const Header = (props) => {
    return <Table tableHead={["Tav.", "N° coperti", "Cliente", "Tot (€)"]} tableData={[[props.table, "" + props.seats, props.customer, formatAmount(props.totalPrice, false)]]} />;
};

Header.propTypes = {
    id: PropTypes.number,
    table: PropTypes.string.isRequired,
    customer: PropTypes.string.isRequired,
    seats: PropTypes.number.isRequired,
    totalPrice: PropTypes.number.isRequired,
    standId: PropTypes.number.isRequired
};

export default Header;
