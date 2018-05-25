import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import ItemGrid from "components/Grid/ItemGrid";

const style = {};

const WaitDialog = props => {
  const { classes, loading, message } = props;

  return (
    <Dialog open={loading}>
      <DialogTitle>{"Attendere"}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
        <Grid container direction="column">
          <ItemGrid xs={12}>
            <CircularProgress size={60} thickness={7} />
          </ItemGrid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

WaitDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired
};

export default withStyles(style)(WaitDialog);
