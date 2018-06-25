import React from "react";
import PropTypes from "prop-types";
import Table from "components/Table";
import { formatAmount } from "utils/string";

const buildTableRow = dish => [
  dish.group,
  dish.name,
  formatAmount(dish.price, false)
];

const List = props => {
  return (
    <Table
      tableHead={["Gruppo", "Nome", "Prezzo"]}
      tableData={props.dishList.map(buildTableRow)}
    />
  );
};

List.propTypes = {
  dishList: PropTypes.array.isRequired
};

export default List;
