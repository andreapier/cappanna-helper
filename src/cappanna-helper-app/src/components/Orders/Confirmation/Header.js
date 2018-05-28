import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Table from "components/Table";

const styles = theme => ({});

const Header = props => {
  return (
    <Table
      tableHeaderColor="primary"
      tableHead={["Tav.", "N° coperti", "Tot (€)"]}
      tableData={[[props.table, "" + props.seats, props.totalPrice]]}
    />
  );
};

Header.propTypes = {
  table: PropTypes.string.isRequired,
  seats: PropTypes.number.isRequired,
  totalPrice: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);
