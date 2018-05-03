import React from "react";
import PropTypes from "prop-types";
import { Menu } from "@material-ui/icons";
import {
  withStyles,
  AppBar,
  Toolbar,
  IconButton,
  Hidden,
  Typography
} from "material-ui";
import headerStyle from "variables/styles/headerStyle";

function Header({ ...props }) {
  const { classes, title, handleDrawerToggle } = props;

  return (
    <AppBar className={classes.appBar}>
      <Toolbar>
        <Hidden mdUp>
          <IconButton
            className={classes.appResponsive}
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
          >
            <Menu />
          </IconButton>
        </Hidden>
        <Typography className={classes.title}>{title}</Typography>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  handleDrawerToggle: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
};

export default withStyles(headerStyle)(Header);
