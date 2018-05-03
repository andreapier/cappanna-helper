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

  if (routeData.protected && !user) {
    return null;
  }

  if (user && signinRoute(routeData.name)) {
    return null;
  }

  const listItemClasses = cx({
    [" " + classes[color]]: isRouteActive(routeData.path, location)
  });
  const whiteFontClasses = cx({
    [" " + classes.whiteFont]: isRouteActive(routeData.path, location)
  });

  return (
    <NavLink
      to={routeData.path}
      className={classes.item}
      activeClassName="active"
    >
      <ListItem button className={classes.itemLink + listItemClasses}>
        <ListItemIcon className={classes.itemIcon + whiteFontClasses}>
          <routeData.icon />
        </ListItemIcon>
        <ListItemText
          primary={routeData.sidebarName}
          className={classes.itemText + whiteFontClasses}
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
