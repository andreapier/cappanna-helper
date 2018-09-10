import React from "react";
import PropTypes from "prop-types";
import Toolbar from "@material-ui/core/Toolbar";
import Assignment from "@material-ui/icons/Assignment";
import IconButton from "components/CustomButtons/IconButton";
import withStyles from "@material-ui/core/styles/withStyles";

const style = {
  icon: {
    marginRight: "20px"
  }
};

const Header = props => {
  return (
    <Toolbar>
      <IconButton
        onClick={props.orderDetailsAggregationRequested}
        customClass={props.classes.icon}
      >
        <Assignment />
      </IconButton>
    </Toolbar>
  );
};

Header.propTypes = {
  orderDetailsAggregationRequested: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(style)(Header);
