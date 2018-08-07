import React from "react";
import PropTypes from "prop-types";
import Toolbar from "@material-ui/core/Toolbar";
import ContentAdd from "@material-ui/icons/Add";
import IconButton from "components/CustomButtons/IconButton";
import PermIdentity from "@material-ui/icons/PermIdentity";
import SupervisorAccount from "@material-ui/icons/SupervisorAccount";
import NavigationRefresh from "@material-ui/icons/Refresh";

const Header = props => {
  return (
    <Toolbar>
      <IconButton onClick={props.goToNewOrder} style={{ marginRight: "10px" }}>
        <ContentAdd />
      </IconButton>
      <IconButton
        onClick={props.loadOrdersListRequested}
        style={{ marginRight: "10px" }}
      >
        <NavigationRefresh />
      </IconButton>
      {props.isFiltered ? (
        <IconButton onClick={props.toggleOrdersListFilter}>
          <SupervisorAccount />
        </IconButton>
      ) : (
        <IconButton onClick={props.toggleOrdersListFilter}>
          <PermIdentity />
        </IconButton>
      )}
    </Toolbar>
  );
};

Header.propTypes = {
  loadOrdersListRequested: PropTypes.func.isRequired,
  goToNewOrder: PropTypes.func.isRequired,
  toggleOrdersListFilter: PropTypes.func.isRequired,
  isFiltered: PropTypes.bool.isRequired
};

export default Header;
