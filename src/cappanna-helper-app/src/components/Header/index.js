import React from "react";
import PropTypes from "prop-types";
import { Menu } from "@material-ui/icons";
import { withStyles, AppBar, Toolbar, IconButton, Hidden } from "material-ui";
import cx from "classnames";
import headerStyle from "variables/styles/headerStyle";

function Header({ ...props }) {
  const { classes, color } = props;
  const appBarClasses = cx({
    [" " + classes[color]]: color
  });

  return (
    <AppBar className={classes.appBar + appBarClasses}>
      <Hidden mdUp>
        <Toolbar className={classes.container}>
          <IconButton
            className={classes.appResponsive}
            color="inherit"
            aria-label="open drawer"
            onClick={props.handleDrawerToggle}
          >
            <Menu />
          </IconButton>
        </Toolbar>
      </Hidden>
    </AppBar>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"])
};

export default withStyles(headerStyle)(Header);
