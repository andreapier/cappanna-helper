import {
  grayColor,
  primaryColor,
  successColor,
  warningColor,
  dangerColor
} from "variables/styles";

const iconButtonStyle = {
  button: {
    height: "40px",
    minWidth: "40px",
    width: "40px",
    borderRadius: "50%",
    fontSize: "24px",
    padding: "0",
    overflow: "hidden",
    position: "relative",
    lineHeight: "normal",
    border: "none",
    fontWeight: "400",
    textTransform: "uppercase",
    letterSpacing: "0",
    willChange: "box-shadow, transform",
    transition:
      "box-shadow 0.2s cubic-bezier(0.4, 0, 1, 1), background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    display: "inline-block",
    textAlign: "center",
    whiteSpace: "nowrap",
    verticalAlign: "middle",
    touchAction: "manipulation",
    cursor: "pointer",
    userSelect: "none",
    backgroundImage: "none",
    backgroundColor: grayColor,
    "&:hover": {
      backgroundColor: grayColor,
      boxShadow:
        "0 14px 26px -12px rgba(153, 153, 153, 0.42), 0 4px 23px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(153, 153, 153, 0.2)"
    }
  },
  primary: {
    color: "#FFFFFF",
    backgroundColor: primaryColor,
    "&:hover": {
      backgroundColor: primaryColor,
      boxShadow:
        "0 14px 26px -12px rgba(0, 188, 212, 0.42), 0 4px 23px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 188, 212, 0.2)"
    }
  },
  success: {
    backgroundColor: successColor,
    "&:hover": {
      backgroundColor: successColor,
      boxShadow:
        "0 14px 26px -12px rgba(76, 175, 80, 0.42), 0 4px 23px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(76, 175, 80, 0.2)"
    }
  },
  warning: {
    backgroundColor: warningColor,
    "&:hover": {
      backgroundColor: warningColor,
      boxShadow:
        "0 14px 26px -12px rgba(255, 152, 0, 0.42), 0 4px 23px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(255, 152, 0, 0.2)"
    }
  },
  danger: {
    backgroundColor: dangerColor,
    "&:hover": {
      backgroundColor: dangerColor,
      boxShadow:
        "0 14px 26px -12px rgba(244, 67, 54, 0.42), 0 4px 23px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(244, 67, 54, 0.2)"
    }
  },
  white: {
    "&,&:focus,&:hover": {
      backgroundColor: "#FFFFFF",
      color: grayColor
    }
  },
  simple: {
    color: "#FFFFFF",
    background: "transparent",
    boxShadow: "none"
  }
};

export default iconButtonStyle;
