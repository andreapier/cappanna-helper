import React from "react";
import PropTypes from "prop-types";
import Table from "components/Table";
import { formatAmount } from "utils/string";
import { TextField, withStyles } from "@material-ui/core";

const buildTableRow = dish => [
  dish.item.name,
  formatAmount(dish.item.price, false),
  dish.quantity
];

const style = {
  notes: {
    marginTop: "20px"
  }
};

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
        className={props.classes.notes}
      />
    </div>
  );
};

Body.propTypes = {
  dishList: PropTypes.arrayOf(
    PropTypes.shape({
      subtotal: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
      item: PropTypes.shape({
        group: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired
      })
    })
  ).isRequired,
  notes: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(style)(Body);
