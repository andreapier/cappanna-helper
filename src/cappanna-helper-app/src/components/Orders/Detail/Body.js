import React from "react";
import PropTypes from "prop-types";
import Table from "components/Table";
import { formatAmount } from "utils/string";
import TextField from "@material-ui/core/TextField";

const buildTableRow = dish => [
  dish.group,
  dish.name,
  formatAmount(dish.price, false),
  dish.quantity,
  formatAmount(dish.totalPrice, false)
];

const Body = props => {
  return (
    <div>
      <Table
        tableHead={["Gruppo", "Nome", "Prezzo (€)", "Quantità", "Totale (€)"]}
        tableData={props.dishList.map(buildTableRow)}
      />
      <TextField
        label="Note"
        multiline
        readonly
        fullWidth
        value={props.notes}
        style={{ marginTop: "20px" }}
      />
    </div>
  );
};

Body.propTypes = {
  dishList: PropTypes.array.isRequired,
  notes: PropTypes.string.isRequired
};

export default Body;
