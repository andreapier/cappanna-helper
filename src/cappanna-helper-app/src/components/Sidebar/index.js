import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React from "react";
import sidebarStyle from "variables/styles/sidebarStyle";
import Links from "./Links";
import Logo from "./Logo";

const Sidebar = props => {
  const {
    classes,
    logo,
    logoText,
    routes,
    user,
    handleSidebarNavigationItemClick
  } = props;

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
          <Links
            routes={routes}
            user={user}
            handleSidebarNavigationItemClick={handleSidebarNavigationItemClick}
          />
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
          <Links routes={routes} user={user} />
        </Drawer>
      </Hidden>
    </div>
  );
};

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSidebarNavigationItemClick: PropTypes.func.isRequired
};

export default withStyles(sidebarStyle)(Sidebar);
