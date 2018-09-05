import React from "react";
import PropTypes from "prop-types";
import Table from "components/Table";
import { formatAmount } from "utils/string";
import TextField from "@material-ui/core/TextField";

const buildTableRow = dish => [
  dish.item.name,
  formatAmount(dish.item.price, false),
  dish.quantity
];

const Body = props => {
  return (
    <div>
      <Table
        tableHead={["Nome", "Prezzo (€)", "Quantità"]}
        tableData={props.dishList.map(buildTableRow)}
      />
      <TextField
        label="Note"
        multiline
        readOnly
        fullWidth
        value={props.notes}
        style={{ marginTop: "20px" }}
      />
    </div>
  );
};

Body.propTypes = {
  dishList: PropTypes.arrayOf(PropTypes.shape({
    subtotal: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    item: PropTypes.shape({
      group: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired
    })
  })).isRequired,
  notes: PropTypes.string.isRequired
};

export default Body;
