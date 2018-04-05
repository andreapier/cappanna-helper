import React from "react";
import { AddAlert } from "material-ui-icons";
import { SnackbarContent } from "components";

const ErrorSnackbar = (props) => {
    return (    
        <SnackbarContent
            message={props.message}
            color="danger"
            icon={AddAlert}
        />
    );
};

export default ErrorSnackbar;
