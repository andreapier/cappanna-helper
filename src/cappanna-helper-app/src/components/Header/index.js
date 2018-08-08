import React from "react";
import PropTypes from "prop-types";
import Menu from "@material-ui/icons/Menu";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
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
            variant="title"
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
