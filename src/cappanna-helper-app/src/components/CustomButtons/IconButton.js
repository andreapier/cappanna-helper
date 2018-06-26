import React from "react";
import { withStyles, IconButton } from "@material-ui/core";
import PropTypes from "prop-types";
import iconButtonStyle from "variables/styles/iconButtonStyle";

const IconCustomButton = props => {
  const { classes, color, children, customClass, ...rest } = props;
  const colorWithDisabled = props.disabled ? "" : color;

  return (
    <IconButton
      {...rest}
      className={
        classes.button + " " + classes[colorWithDisabled] +
        (customClass ? " " + customClass : "")
      }
    >
      {children}
    </IconButton>
  );
};

IconCustomButton.defaultProps = {
  color: "info"
};

IconCustomButton.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf([
    "primary",
    "info",
    "success",
    "warning",
    "danger",
    "white",
    "simple"
  ]),
  customClass: PropTypes.string,
  disabled: PropTypes.bool
};

export default withStyles(iconButtonStyle)(IconCustomButton);
