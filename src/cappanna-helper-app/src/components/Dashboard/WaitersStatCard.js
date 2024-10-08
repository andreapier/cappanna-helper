import React from "react";
import PropTypes from "prop-types";
import RegularCard from "components/Cards/RegularCard";
import Table from "components/Table";
import { formatAmount } from "utils/string";

const buildTableRow = (data) => [data.waiter, data.ordersQuantity, formatAmount(data.income)];

const WaitersStatCard = (props) => {
    return (
        <RegularCard cardTitle="Ordini per cameriere">
            <Table tableHead={["Cameriere", "Ordini", "Incasso"]} tableData={props.data.map(buildTableRow)} />
        </RegularCard>
    );
};

WaitersStatCard.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            waiter: PropTypes.string.isRequired,
            ordersQuantity: PropTypes.number.isRequired,
            income: PropTypes.number.isRequired
        })
    ).isRequired
};

export default WaitersStatCard;
