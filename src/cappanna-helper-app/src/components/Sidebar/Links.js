import PropTypes from "prop-types";
import React from "react";
import SidebarNavigationItem from "./SidebarNavigationItem";
import List from "@material-ui/core/List";
import { withStyles } from "@material-ui/core/styles";
import sidebarStyle from "variables/styles/sidebarStyle";

const Links = props => {
  const { classes, routes, user, handleSidebarNavigationItemClick } = props;

  return (
    <div className={classes.sidebarWrapper}>
      <List className={classes.list}>
        {routes.map((routeData, key) => {
          const itemProps = {
            routeData,
            user,
            handleSidebarNavigationItemClick
          };

          return <SidebarNavigationItem {...itemProps} key={key} />;
        })}
      </List>
    </div>
  );
};

Links.propTypes = {
  classes: PropTypes.object.isRequired,
  routes: PropTypes.array.isRequired
};

export default withStyles(sidebarStyle)(Links);
