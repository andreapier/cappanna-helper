import PropTypes from "prop-types";
import React from "react";
import logoStyle from "variables/styles/logoStyle";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import logo from "assets/img/logo.png";

const Logo = props => {
  return (
    <div className={props.classes.logo}>
      <div className={props.classes.logoImage}>
        <img src={logo} alt="logo" className={props.classes.img} />
      </div>
      <Typography className={props.classes.logoText}>
        Cappanna Helper
      </Typography>
    </div>
  );
};

Logo.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(logoStyle)(Logo);
