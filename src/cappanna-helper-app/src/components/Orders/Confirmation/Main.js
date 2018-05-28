import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Table from "components/Table";

const styles = theme => ({});

const Main = props => {
  return (
    <Table
      tableHeaderColor="primary"
      tableHead={["Nome", "Prezzo (€)", "Qta", "Tot (€)"]}
      tableData={props.orderData}
    />
  );
};

Main.propTypes = {
  orderData: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
      totalPrice: PropTypes.number.isRequired
    })
  ).isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Main);
