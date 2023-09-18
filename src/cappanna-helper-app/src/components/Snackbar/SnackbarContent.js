import React from "react";
import { IconButton, SnackbarContent } from "@mui/material";
import { makeStyles } from '@mui/styles';
import Close from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import cx from "classnames";
import snackbarContentStyle from "variables/styles/snackbarContentStyle";

const useStyles = makeStyles(snackbarContentStyle);

function CustomSnackbarContent({ ...props }) {
    const classes = useStyles();
    const { message, color, close, icon } = props;
    var action = [];
    const messageClasses = cx({
        [classes.iconMessage]: icon !== undefined
    });
    if (close !== undefined) {
        action = [
            <IconButton
                className={classes.iconButton}
                key="close"
                aria-label="Close"
                color="inherit"
                size="large">
                <Close className={classes.close} />
            </IconButton>
        ];
    }
    return (
        <SnackbarContent
            message={
                <div>
                    {icon !== undefined ? <props.icon className={classes.icon} /> : null}
                    <span className={messageClasses}>{message}</span>
                </div>
            }
            classes={{
                root: classes.root + " " + classes[color],
                message: classes.message
            }}
            action={action}
        />
    );
}

CustomSnackbarContent.propTypes = {
    message: PropTypes.node.isRequired,
    color: PropTypes.oneOf(["info", "success", "warning", "danger", "primary"]),
    close: PropTypes.bool,
    icon: PropTypes.func
};

export default CustomSnackbarContent;
