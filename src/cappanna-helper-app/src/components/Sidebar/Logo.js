import PropTypes from "prop-types";
import React from "react";
import logoStyle from "variables/styles/logoStyle";
import { Typography, withStyles } from "material-ui";

const Logo = ({ classes, logo, logoText }) => {
  return (
    <div className={classes.logo}>
      <div className={classes.logoImage}>
        <img src={logo} alt="logo" className={classes.img} />
      </div>
      <Typography className={classes.logoText}>{logoText}</Typography>
    </div>
  );
};

Logo.propTypes = {
  classes: PropTypes.object.isRequired,
  logo: PropTypes.string.isRequired,
  logoText: PropTypes.string.isRequired
};

export default withStyles(logoStyle)(Logo);
