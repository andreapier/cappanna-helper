import React from "react";
import PropTypes from "prop-types";
import { Toolbar, withStyles } from "@material-ui/core";
import ContentAdd from "@material-ui/icons/Add";
import IconButton from "components/CustomButtons/IconButton";
import PermIdentity from "@material-ui/icons/PermIdentity";
import SupervisorAccount from "@material-ui/icons/SupervisorAccount";
import NavigationRefresh from "@material-ui/icons/Refresh";

const style = {
  icon: {
    marginRight: "20px"
  }
};

const Header = props => {
  return (
    <Toolbar>
      <IconButton onClick={props.goToNewOrder} customClass={props.classes.icon}>
        <ContentAdd />
      </IconButton>
      <IconButton
        onClick={props.loadOrdersListRequested}
        customClass={props.classes.icon}
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
  isFiltered: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(style)(Header);
