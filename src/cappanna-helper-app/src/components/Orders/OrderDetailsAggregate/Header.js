import React from "react";
import PropTypes from "prop-types";
import { Toolbar, withStyles } from "@material-ui/core";
import Assignment from "@material-ui/icons/Assignment";
import IconButton from "components/CustomButtons/IconButton";

const style = {
  icon: {
    marginRight: "20px"
  }
};

const Header = props => {
  return (
    <Toolbar>
      <IconButton
        onClick={() => props.orderDetailsAggregationRequested(props.ordersId)}
        customClass={props.classes.icon}
        disabled={props.ordersId.length === 0}
      >
        <Assignment />
      </IconButton>
    </Toolbar>
  );
};

Header.propTypes = {
  ordersId: PropTypes.arrayOf(PropTypes.number).isRequired,
  orderDetailsAggregationRequested: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(style)(Header);
