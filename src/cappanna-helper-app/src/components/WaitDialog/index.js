import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Dialog, CircularProgress, DialogContent, DialogContentText, DialogTitle, withStyles } from "@material-ui/core";
import waitDialogStyle from "variables/styles/waitDialogStyle";

const WaitDialog = (props) => {
    const { classes } = props;
    const loading = useSelector(state => state.api.loading);
    const message = useSelector(state => state.api.message);

    const onClose = (event, reason) => {
        console.log("onClose", reason);
        if (reason !== "backdropClick") {
            onClose(event, reason);
        }
    };

    return (
        <Dialog open={loading} onClose={onClose} disableEscapeKeyDown className={classes.root}>
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
};

export default withStyles(waitDialogStyle)(WaitDialog);
