import React from "react";
import PropTypes from "prop-types";
import RegularCard from "components/Cards/RegularCard";
import Table from "components/Table";
import { formatAmount } from "utils/string";

const buildTableRow = data => [
  data.standName,
  data.orderQuantity,
  formatAmount(data.income)
];

const OrderStatCard = props => {
  return (
    <RegularCard cardTitle="Ordini per stand">
      <Table
        tableHead={["Stand", "Ordini", "Incasso"]}
        tableData={props.data.map(buildTableRow)}
      />
    </RegularCard>
  );
};

OrderStatCard.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      standName: PropTypes.string.isRequired,
      orderCount: PropTypes.number.isRequired,
      income: PropTypes.number.isRequired
    })
  ).isRequired
};

export default OrderStatCard;
