import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import waitDialogStyle from "variables/styles/waitDialogStyle";

const WaitDialog = props => {
  const { classes, loading, message } = props;

  return (
    <Dialog
      open={loading}
      disableBackdropClick
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
