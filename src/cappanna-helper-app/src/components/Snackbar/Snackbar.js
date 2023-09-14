import React from "react";
import { IconButton, Snackbar, withStyles } from "@material-ui/core";
import Close from "@material-ui/icons/Close";
import PropTypes from "prop-types";
import cx from "classnames";
import snackbarContentStyle from "variables/styles/snackbarContentStyle";

const CustomSnackbar = (props) => {
    const { classes, message, color, close, icon, place, open, autoHideDuration, onClose } = props;
    var action = [];
    const messageClasses = cx({
        [classes.iconMessage]: icon !== undefined
    });
    const actualMessage = message.indexOf("\n") <= -1 ? message : message.split("\n");

    if (close !== undefined) {
        action = [
            <IconButton className={classes.iconButton} key="close" aria-label="Close" color="inherit" onClick={() => props.closeNotification()}>
                <Close className={classes.close} />
            </IconButton>
        ];
    }

    return (
        <Snackbar
            anchorOrigin={{
                vertical: place.indexOf("t") === -1 ? "bottom" : "top",
                horizontal: place.indexOf("l") !== -1 ? "left" : place.indexOf("c") !== -1 ? "center" : "right"
            }}
            open={open}
            message={
                <div>
                    {icon !== undefined ? <props.icon className={classes.icon} /> : null}
                    {actualMessage.map ? (
                        actualMessage.map((e, i) => (
                            <p className={messageClasses} key={i}>
                                {e}
                            </p>
                        ))
                    ) : (
                        <span className={messageClasses}>{actualMessage}</span>
                    )}
                </div>
            }
            action={action}
            ContentProps={{
                classes: {
                    root: classes.root + " " + classes[color],
                    message: classes.message
                }
            }}
            autoHideDuration={autoHideDuration}
            onClose={onClose}
        />
    );
};

CustomSnackbar.propTypes = {
    classes: PropTypes.object.isRequired,
    message: PropTypes.node.isRequired,
    color: PropTypes.oneOf(["info", "success", "warning", "danger", "primary"]),
    close: PropTypes.bool,
    icon: PropTypes.object,
    place: PropTypes.oneOf(["tl", "tr", "tc", "br", "bl", "bc"]),
    open: PropTypes.bool
};

export default withStyles(snackbarContentStyle)(CustomSnackbar);
