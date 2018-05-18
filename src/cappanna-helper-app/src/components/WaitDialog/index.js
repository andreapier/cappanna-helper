import React from "react";
import { withStyles } from "@material-ui/core";
import Dialog, {
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core/Dialog";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import ItemGrid from "components/Grid/ItemGrid";

const style = {};

function WaitDialog({ ...props }) {
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
}

export default withStyles(style)(WaitDialog);
