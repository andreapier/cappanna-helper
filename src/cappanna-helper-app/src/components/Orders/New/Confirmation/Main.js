import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Table from "components/Table";
import { formatAmount } from "utils/string";

const styles = {};

const Main = props => {
  return (
    <Table
      tableHead={["Nome", "Prezzo (€)", "Qta", "Tot (€)"]}
      tableData={props.details.map(e => [
        e.item.name,
        formatAmount(e.item.price, false),
        e.quantity,
        formatAmount(e.totalPrice, false)
      ])}
    />
  );
};

Main.propTypes = {
  details: PropTypes.arrayOf(
    PropTypes.shape({
      quantity: PropTypes.number.isRequired,
      totalPrice: PropTypes.number.isRequired,
      item: PropTypes.shape({
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired
      }).isRequired
    }).isRequired
  ).isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Main);
