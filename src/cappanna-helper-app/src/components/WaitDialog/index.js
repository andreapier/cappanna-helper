import React from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  CircularProgress,
  DialogContent,
  DialogContentText,
  DialogTitle,
  withStyles
} from "@material-ui/core";
import waitDialogStyle from "variables/styles/waitDialogStyle";

const WaitDialog = props => {
  const { classes, loading, message } = props;

  const onClose = (event, reason) => {
    if (reason !== "backdropClick") {
      onClose(event, reason);
    }
  };

  return (
    <Dialog
      open={loading}
      onClose={onClose}
      disableEscapeKeyDown
      className={classes.root}
    >
      <DialogTitle className={classes.title}>{"Attendere"}</DialogTitle>
      <DialogContent className={classes.content}>
        <CircularProgress size={60} thickness={7} />
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

WaitDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired
};

export default withStyles(waitDialogStyle)(WaitDialog);
