import React from "react";
import { withStyles } from "material-ui";
import Dialog, {
    DialogContent,
    DialogContentText,
    DialogTitle
} from 'material-ui/Dialog';
import Grid from 'material-ui/Grid';
import { CircularProgress } from 'material-ui/Progress';
import ItemGrid from "components/Grid/ItemGrid";

const style = {
    
};

function WaitDialog({ ...props }) {
  const { classes, loading, message } = props;

  return (
    <Dialog open={loading}>
        <DialogTitle>{"Attendere"}</DialogTitle>
        <DialogContent>
            <DialogContentText>
                {message}
            </DialogContentText>
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
