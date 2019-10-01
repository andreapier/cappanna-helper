import React from "react";
import PropTypes from "prop-types";
import { Toolbar, withStyles } from "@material-ui/core";
import ContentAdd from "@material-ui/icons/Add";
import IconButton from "components/CustomButtons/IconButton";
import PermIdentity from "@material-ui/icons/PermIdentity";
import Public from "@material-ui/icons/Public";
import Storefront from "@material-ui/icons/Storefront";
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
      {props.filters.user ? (
        <IconButton onClick={props.toggleOrdersListFilterByUser}>
          <SupervisorAccount />
        </IconButton>
      ) : (
        <IconButton onClick={props.toggleOrdersListFilterByUser}>
          <PermIdentity />
        </IconButton>
      )}
      {props.filters.stand ? (
        <IconButton onClick={props.toggleOrdersListFilterByStand}>
          <Storefront />
        </IconButton>
      ) : (
        <IconButton onClick={props.toggleOrdersListFilterByStand}>
          <Public />
        </IconButton>
      )}
    </Toolbar>
  );
};

Header.propTypes = {
  loadOrdersListRequested: PropTypes.func.isRequired,
  goToNewOrder: PropTypes.func.isRequired,
  toggleOrdersListFilterByUser: PropTypes.func.isRequired,
  toggleOrdersListFilterByStand: PropTypes.func.isRequired,
  filters: PropTypes.shape({
    user: PropTypes.bool.isRequired,
    stand: PropTypes.bool.isRequired
  }).isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(style)(Header);
