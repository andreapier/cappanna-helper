import { ListItem, ListItemIcon, ListItemText, withStyles } from "material-ui";
import { NavLink } from "react-router-dom";
import cx from "classnames";
import PropTypes from "prop-types";
import React from "react";
import sidebarStyle from "variables/styles/sidebarStyle";
import { withRouter } from "react-router-dom";
import { isRouteActive } from "routes/helpers";

const signinRoute = routeName => routeName === "signin";

const SidebarNavigationItem = ({
  routeData,
  location,
  user,
  classes,
  color
}) => {
  if (routeData.redirect) {
    return null;
  }

  if (!routeData.sidebarName) {
    return null;
  }

  if (routeData.protected && !user.token) {
    return null;
  }

  if (user && signinRoute(routeData.name)) {
    return null;
  }

  const selectedItemLinkClasses = cx({
    [" " + classes.selectedItemLink]: isRouteActive(routeData.path, location)
  });

  return (
    <NavLink
      to={routeData.path}
      className={classes.item}
      activeClassName="active"
    >
      <ListItem button className={classes.itemLink + selectedItemLinkClasses}>
        <ListItemIcon className={classes.itemIcon}>
          <routeData.icon />
        </ListItemIcon>
        <ListItemText
          primary={routeData.sidebarName}
          className={classes.itemText}
          disableTypography
        />
      </ListItem>
    </NavLink>
  );
};

SidebarNavigationItem.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(sidebarStyle)(SidebarNavigationItem));
