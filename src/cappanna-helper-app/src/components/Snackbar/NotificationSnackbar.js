import React from "react";
import PropTypes from "prop-types";
import Info from "@material-ui/icons/Info";
import Warning from "@material-ui/icons/Warning";
import ErrorIcon from "@material-ui/icons/Error";
import Snackbar from "components/Snackbar/Snackbar";
import SlideUpTransition from "components/Snackbar/SlideUpTransition";

const NotificationSnackbar = props => {
  let icon = ErrorIcon;
  let color = "danger";

  if (props.type === 'info') {
    icon = Info;
    color = "primary";
  } else if (props.type === 'warning') {
    icon = Warning;
    color = "warning";
  }
  
  return (
    <Snackbar
      onClose={props.handleClose}
      message={props.message}
      color={color}
      icon={icon}
      autoHideDuration={5000}
      transition={SlideUpTransition}
      open={!!props.message}
      place="bc"
    />
  );
};

NotificationSnackbar.propTypes = {
  type: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired
};

export default NotificationSnackbar;
