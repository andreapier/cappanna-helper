import React from "react";
import PropTypes from "prop-types";
import Table from "components/Table";
import { formatAmount } from "utils/string";

const buildTableRow = dish => [
  dish.group,
  dish.name,
  formatAmount(dish.price, false),
  dish.quantity,
  formatAmount(dish.totalPrice)
];

const Body = props => {
  return (
    <Table
      tableHead={["Gruppo", "Nome", "Prezzo (€)", "Quantità", "Totale (€)"]}
      tableData={props.dishList.map(buildTableRow)}
    />
  );
};

Body.propTypes = {
  dishList: PropTypes.array.isRequired
};

export default Body;
