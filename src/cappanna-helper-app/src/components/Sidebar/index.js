import { Drawer, Hidden, List, withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
import sidebarStyle from "variables/styles/sidebarStyle";
import SidebarNavigationItem from "./SidebarNavigationItem";
import Logo from "./Logo";

const Sidebar = ({ ...props }) => {
  const { classes, logo, logoText, routes, user } = props;
  const links = (
    <List className={classes.list}>
      {routes.map((routeData, key) => {
        const itemProps = { routeData, user };

        return <SidebarNavigationItem {...itemProps} key={key} />;
      })}
    </List>
  );

  return (
    <div>
      <Hidden mdUp>
        <Drawer
          open={props.open}
          classes={{
            paper: classes.drawerPaper
          }}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true
          }}
        >
          <Logo logo={logo} logoText={logoText} />
          <div className={classes.sidebarWrapper}>{links}</div>
        </Drawer>
      </Hidden>
      <Hidden smDown>
        <Drawer
          variant="permanent"
          open
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <Logo logo={logo} logoText={logoText} />
          <div className={classes.sidebarWrapper}>{links}</div>
        </Drawer>
      </Hidden>
    </div>
  );
};

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(sidebarStyle)(Sidebar);
