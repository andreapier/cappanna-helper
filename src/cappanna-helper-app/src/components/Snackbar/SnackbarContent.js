import React from "react";
import { IconButton, SnackbarContent, withStyles } from "@material-ui/core";
import Close from "@material-ui/icons/Close";
import PropTypes from "prop-types";
import cx from "classnames";
import snackbarContentStyle from "variables/styles/snackbarContentStyle";

function CustomSnackbarContent({ ...props }) {
  const { classes, message, color, close, icon } = props;
  var action = [];
  const messageClasses = cx({
    [classes.iconMessage]: icon !== undefined
  });
  if (close !== undefined) {
    action = [
      <IconButton
        className={classes.iconButton}
        key="close"
        aria-label="Close"
        color="inherit"
      >
        <Close className={classes.close} />
      </IconButton>
    ];
  }
  return (
    <SnackbarContent
      message={
        <div>
          {icon !== undefined ? <props.icon className={classes.icon} /> : null}
          <span className={messageClasses}>{message}</span>
        </div>
      }
      classes={{
        root: classes.root + " " + classes[color],
        message: classes.message
      }}
      action={action}
    />
  );
}

CustomSnackbarContent.propTypes = {
  classes: PropTypes.object.isRequired,
  message: PropTypes.node.isRequired,
  color: PropTypes.oneOf(["info", "success", "warning", "danger", "primary"]),
  close: PropTypes.bool,
  icon: PropTypes.func
};

export default withStyles(snackbarContentStyle)(CustomSnackbarContent);
