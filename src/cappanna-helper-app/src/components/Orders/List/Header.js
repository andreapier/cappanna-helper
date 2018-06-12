import React from "react";
import PropTypes from "prop-types";
import Toolbar from "@material-ui/core/Toolbar";
import ContentAdd from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import NavigationRefresh from "@material-ui/icons/Refresh";

const Header = props => {
  return (
    <Toolbar>
      <IconButton onClick={props.goToNewOrder}>
        <ContentAdd />
      </IconButton>
      <IconButton onClick={props.loadOrdersListRequested}>
        <NavigationRefresh />
      </IconButton>
    </Toolbar>
  );
};

Header.propTypes = {
  loadOrdersListRequested: PropTypes.func.isRequired,
  goToNewOrder: PropTypes.func.isRequired
};

export default Header;
