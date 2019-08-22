import React from "react";
import PropTypes from "prop-types";
import Menu from "@material-ui/icons/Menu";
import {
  AppBar,
  Hidden,
  IconButton,
  Toolbar,
  Typography,
  withStyles
} from "@material-ui/core";
import headerStyle from "variables/styles/headerStyle";

function Header(props) {
  const { classes, title, handleDrawerToggle } = props;

  return (
    <div className={classes.flex.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Hidden mdUp>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerToggle}
            >
              <Menu />
            </IconButton>
          </Hidden>
          <Typography
            variant="h6"
            color="inherit"
            className={classes.flex.flex}
          >
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

Header.propTypes = {
  handleDrawerToggle: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
};

export default withStyles(headerStyle)(Header);
