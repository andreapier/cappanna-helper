import PropTypes from "prop-types";
import React from "react";
import SidebarNavigationItem from "./SidebarNavigationItem";
import List from "@material-ui/core/List";
import { withStyles } from "@material-ui/core/styles";
import sidebarStyle from "variables/styles/sidebarStyle";
import { isRouteActive } from "routes/helpers";
import { flatten } from "utils/array";

const Links = props => {
  const {
    classes,
    routes,
    user,
    handleSidebarNavigationItemClick,
    match,
    location
  } = props;
  console.log(props);

  return (
    <div className={classes.sidebarWrapper}>
      <List className={classes.list}>
        {flatten(routes).map((routeData, key) => {
          const itemProps = {
            routeData,
            user,
            handleSidebarNavigationItemClick
          };
          //active: isRouteActive(routeData.name, match)

          return <SidebarNavigationItem {...itemProps} key={key} />;
        })}
      </List>
    </div>
  );
};

Links.propTypes = {
  classes: PropTypes.object.isRequired,
  routes: PropTypes.array.isRequired,
  location: PropTypes.shape({
    path: PropTypes.string.isRequired
  }).isRequired
};

export default withStyles(sidebarStyle)(Links);
