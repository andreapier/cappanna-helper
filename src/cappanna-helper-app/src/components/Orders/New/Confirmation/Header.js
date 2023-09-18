import React from "react";
import { useSelector } from "react-redux";
import Table from "components/Table";
import { formatAmount } from "utils/string";

const Header = () => {
    const totalPrice = useSelector(state => state.newOrderHeader.totalPrice);
    const chTable = useSelector(state => state.newOrderHeader.chTable);
    const seats = useSelector(state => state.newOrderHeader.seats);
    const customer = useSelector(state => state.newOrderHeader.customer);

    return (
        <Table
            tableHead={["Tav.", "N° coperti", "Cliente", "Tot (€)"]}
            tableData={[[chTable, "" + seats, customer, formatAmount(totalPrice, false)]]}
        />
    );
};

export default Header;
