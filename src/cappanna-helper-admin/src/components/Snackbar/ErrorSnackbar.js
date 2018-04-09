import React from "react";
import Warning from "@material-ui/icons/Warning";
import Snackbar from "components/Snackbar/Snackbar";
import SlideUpTransition from "components/Snackbar/SlideUpTransition";

const ErrorSnackbar = (props) => {
    return (    
        <Snackbar
            onClose={props.handleClose}
            message={<span id="message-id">{props.message}</span>}
            color="danger"
            icon={Warning}
            autoHideDuration={5000}
            transition={SlideUpTransition}
            open={!!props.message}
            place="bc"
            SnackbarContentProps={{
                'aria-describedby': 'message-id'
              }}
        />
    );
};

export default ErrorSnackbar;
