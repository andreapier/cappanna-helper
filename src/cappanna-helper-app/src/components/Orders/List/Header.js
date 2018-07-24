import React from "react";
import PropTypes from "prop-types";
import Toolbar from "@material-ui/core/Toolbar";
import ContentAdd from "@material-ui/icons/Add";
import IconButton from "components/CustomButtons/IconButton";
import NavigationRefresh from "@material-ui/icons/Refresh";

const Header = props => {
  return (
    <Toolbar>
      <IconButton
        onClick={props.goToNewOrder}
        color="white"
        style={{ marginRight: "10px" }}
      >
        <ContentAdd />
      </IconButton>
      <IconButton onClick={props.loadOrdersListRequested} color="white">
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
