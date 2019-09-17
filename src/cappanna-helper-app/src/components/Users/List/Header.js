import React from "react";
import PropTypes from "prop-types";
import { Toolbar, withStyles } from "@material-ui/core";
import ContentAdd from "@material-ui/icons/Add";
import IconButton from "components/CustomButtons/IconButton";
import NavigationRefresh from "@material-ui/icons/Refresh";

const style = {
  icon: {
    marginRight: "20px"
  }
};

const Header = props => {
  return (
    <Toolbar>
      <IconButton onClick={props.goToNewUser} customClass={props.classes.icon}>
        <ContentAdd />
      </IconButton>
      <IconButton
        onClick={props.loadUsersListRequested}
        customClass={props.classes.icon}
      >
        <NavigationRefresh />
      </IconButton>
    </Toolbar>
  );
};

Header.propTypes = {
  loadUsersListRequested: PropTypes.func.isRequired,
  goToNewUser: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(style)(Header);
