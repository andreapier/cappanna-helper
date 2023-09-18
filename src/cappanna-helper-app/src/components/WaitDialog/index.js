import React from "react";
import { useSelector } from "react-redux";
import { Dialog, CircularProgress, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { makeStyles } from '@mui/styles';
import waitDialogStyle from "variables/styles/waitDialogStyle";

const useStyles = makeStyles(waitDialogStyle);

const WaitDialog = () => {
    const classes = useStyles();
    const loading = useSelector(state => state.api.loading);
    const message = useSelector(state => state.api.message);

    const onClose = (event, reason) => {
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

export default WaitDialog;
