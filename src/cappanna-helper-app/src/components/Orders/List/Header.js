import React from "react";
import PropTypes from "prop-types";
import { Toolbar, withStyles } from "@material-ui/core";
import ContentAdd from "@material-ui/icons/Add";
import IconButton from "components/CustomButtons/IconButton";
import PermIdentity from "@material-ui/icons/PermIdentity";
import Public from "@material-ui/icons/Public";
import Storefront from "@material-ui/icons/Storefront";
import Lock from "@material-ui/icons/Lock";
import LockOpen from "@material-ui/icons/LockOpen";
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
      <IconButton
        onClick={props.toggleOrdersListFilterByUser}
        customClass={props.classes.icon}
      >
        {props.filters.user ? <SupervisorAccount /> : <PermIdentity />}
      </IconButton>
      {props.showToggleOrdersListFilterByStand ? (
        <IconButton
          onClick={props.toggleOrdersListFilterByStand}
          customClass={props.classes.icon}
        >
          {props.filters.stand ? <Storefront /> : <Public />}
        </IconButton>
      ) : null}
      {props.showToggleOrdersListFilterByStatus ? (
        <IconButton
          onClick={props.toggleOrdersListFilterByStatus}
          customClass={props.classes.icon}
        >
          {props.filters.status ? <LockOpen /> : <Lock />}
        </IconButton>
      ) : null}
    </Toolbar>
  );
};

Header.propTypes = {
  loadOrdersListRequested: PropTypes.func.isRequired,
  goToNewOrder: PropTypes.func.isRequired,
  toggleOrdersListFilterByUser: PropTypes.func.isRequired,
  toggleOrdersListFilterByStand: PropTypes.func.isRequired,
  toggleOrdersListFilterByStatus: PropTypes.func.isRequired,
  showToggleOrdersListFilterByStand: PropTypes.bool.isRequired,
  showToggleOrdersListFilterByStatus: PropTypes.bool.isRequired,
  filters: PropTypes.shape({
    user: PropTypes.bool.isRequired,
    stand: PropTypes.bool.isRequired,
    status: PropTypes.bool.isRequired
  }).isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(style)(Header);
