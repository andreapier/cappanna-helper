import React from "react";
import { styled } from '@mui/material/styles';
import { useSelector } from "react-redux";
import { Dialog, CircularProgress, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
const PREFIX = 'WaitDialog';

const classes = {
    title: `${PREFIX}-title`,
    paper: `${PREFIX}-paper`,
    content: `${PREFIX}-content`
};

const StyledDialog = styled(Dialog)({
    [`& .${classes.title}`]: {
        textAlign: "center"
    },
    [`& .${classes.paper}`]: {
        width: "300px",
        height: "300px"
    },
    [`& .${classes.content}`]: {
        textAlign: "center"
    }
});

const WaitDialog = () => {
    const loading = useSelector(state => state.api.loading);
    const message = useSelector(state => state.api.message);

    const onClose = (event, reason) => {
        if (reason !== "backdropClick") {
            onClose(event, reason);
        }
    };

    return (
        <StyledDialog open={loading} onClose={onClose} disableEscapeKeyDown className={classes.root}>
            <DialogTitle className={classes.title}>{"Attendere"}</DialogTitle>
            <DialogContent className={classes.content}>
                <CircularProgress size={60} thickness={7} />
                <DialogContentText>{message}</DialogContentText>
            </DialogContent>
        </StyledDialog>
    );
};

export default WaitDialog;
