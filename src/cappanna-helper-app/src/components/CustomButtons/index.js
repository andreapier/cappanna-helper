import React from "react";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import PropTypes from "prop-types";
import cx from "classnames";
import { grayColor, primaryColor, successColor, warningColor, dangerColor } from "variables/styles";

const PREFIX = "RegularButton";

const classes = {
  button: `${PREFIX}-button`,
  fullWidth: `${PREFIX}-fullWidth`,
  primary: `${PREFIX}-primary`,
  success: `${PREFIX}-success`,
  warning: `${PREFIX}-warning`,
  danger: `${PREFIX}-danger`,
  white: `${PREFIX}-white`,
  simple: `${PREFIX}-simple`,
  transparent: `${PREFIX}-transparent`,
  round: `${PREFIX}-round`,
  disabled: `${PREFIX}-disabled`
};

const StyledButton = styled(Button)({
  [`&.${classes.button}`]: {
    backgroundColor: grayColor,
    color: "#FFFFFF",
    border: "none",
    borderRadius: "3px",
    position: "relative",
    padding: "12px",
    margin: "10px 1px",
    fontSize: "12px",
    fontWeight: "400",
    textTransform: "uppercase",
    letterSpacing: "0",
    willChange: "box-shadow, transform",
    transition: "box-shadow 0.2s cubic-bezier(0.4, 0, 1, 1), background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    lineHeight: "1.42857143",
    textAlign: "center",
    whiteSpace: "nowrap",
    verticalAlign: "middle",
    touchAction: "manipulation",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: grayColor,
      boxShadow:
        "0 14px 26px -12px rgba(153, 153, 153, 0.42), 0 4px 23px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(153, 153, 153, 0.2)"
    }
  },
  [`&.${classes.fullWidth}`]: {
    width: "100%"
  },
  [`&.${classes.primary}`]: {
    backgroundColor: primaryColor,
    "&:hover": {
      backgroundColor: primaryColor,
      boxShadow:
        "0 14px 26px -12px rgba(156, 39, 176, 0.42), 0 4px 23px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(156, 39, 176, 0.2)"
    }
  },
  [`&.${classes.success}`]: {
    backgroundColor: successColor,
    "&:hover": {
      backgroundColor: successColor,
      boxShadow:
        "0 14px 26px -12px rgba(76, 175, 80, 0.42), 0 4px 23px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(76, 175, 80, 0.2)"
    }
  },
  [`&.${classes.warning}`]: {
    backgroundColor: warningColor,
    "&:hover": {
      backgroundColor: warningColor,
      boxShadow:
        "0 14px 26px -12px rgba(255, 152, 0, 0.42), 0 4px 23px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(255, 152, 0, 0.2)"
    }
  },
  [`&.${classes.danger}`]: {
    backgroundColor: dangerColor,
    "&:hover": {
      backgroundColor: dangerColor,
      boxShadow:
        "0 14px 26px -12px rgba(244, 67, 54, 0.42), 0 4px 23px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(244, 67, 54, 0.2)"
    }
  },
  [`&.${classes.white}`]: {
    "&,&:focus,&:hover": {
      backgroundColor: "#FFFFFF",
      color: grayColor
    }
  },
  [`&.${classes.simple}`]: {
    "&,&:focus,&:hover": {
      color: "#FFFFFF",
      background: "transparent",
      boxShadow: "none"
    }
  },
  [`&.${classes.transparent}`]: {
    "&,&:focus,&:hover": {
      color: "inherit",
      background: "transparent",
      boxShadow: "none"
    }
  },
  [`&.${classes.round}`]: {
    borderRadius: "30px"
  },
  [`&.${classes.disabled}`]: {
    opacity: "0.65",
    pointerEvents: "none"
  }
});

const RegularButton = (props) => {
  const { color, round, children, fullWidth, disabled, ...rest } = props;
  const btnClasses = cx({
    [classes[color]]: color,
    [classes.round]: round,
    [classes.fullWidth]: fullWidth,
    [classes.disabled]: disabled
  });

  return (
    <StyledButton {...rest} className={classes.button + " " + btnClasses}>
      {children}
    </StyledButton>
  );
};

RegularButton.propTypes = {
  color: PropTypes.oneOf(["primary", "success", "warning", "danger", "white", "simple", "transparent"]),
  round: PropTypes.bool,
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool
};

export default RegularButton;
