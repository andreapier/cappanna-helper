import React from "react";
import { styled } from '@mui/material/styles';
import { IconButton, Snackbar } from "@mui/material";
import Close from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import cx from "classnames";
import { defaultFont, primaryBoxShadow, successBoxShadow, warningBoxShadow, dangerBoxShadow } from "variables/styles";

const PREFIX = 'CustomSnackbar';

const classes = {
    root: `${PREFIX}-root`,
    success: `${PREFIX}-success`,
    warning: `${PREFIX}-warning`,
    danger: `${PREFIX}-danger`,
    primary: `${PREFIX}-primary`,
    message: `${PREFIX}-message`,
    close: `${PREFIX}-close`,
    iconButton: `${PREFIX}-iconButton`,
    icon: `${PREFIX}-icon`,
    iconMessage: `${PREFIX}-iconMessage`
};

const StyledSnackbar = styled(Snackbar)({
    [`& .${classes.root}`]: {
        ...defaultFont,
        position: "relative",
        padding: "20px 15px",
        lineHeight: "20px",
        marginBottom: "20px",
        fontSize: "14px",
        backgroundColor: "white",
        color: "#555555",
        borderRadius: "3px",
        boxShadow: "0 12px 20px -10px rgba(255, 255, 255, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(255, 255, 255, 0.2)",
    },
    [`& .${classes.success}`]: {
        backgroundColor: "#5cb860",
        color: "#ffffff",
        ...successBoxShadow
    },
    [`& .${classes.warning}`]: {
        backgroundColor: "#ffa21a",
        color: "#ffffff",
        ...warningBoxShadow
    },
    [`& .${classes.danger}`]: {
        backgroundColor: "#f55a4e",
        color: "#ffffff",
        ...dangerBoxShadow
    },
    [`& .${classes.primary}`]: {
        backgroundColor: "#1e2a9c",
        color: "#ffffff",
        ...primaryBoxShadow
    },
    [`& .${classes.message}`]: {
        padding: "0",
        display: "block",
        maxWidth: "89%"
    },
    [`& .${classes.close}`]: {
        width: "14px",
        height: "14px"
    },
    [`& .${classes.iconButton}`]: {
        width: "24px",
        height: "24px"
    },
    [`& .${classes.icon}`]: {
        display: "block",
        left: "15px",
        position: "absolute",
        top: "50%",
        marginTop: "-15px",
        width: "30px",
        height: "30px"
    },
    [`& .${classes.iconMessage}`]: {
        paddingLeft: "65px",
        display: "block"
    }
});

const CustomSnackbar = props => {
    const { message, color, close, icon, place, open, autoHideDuration, onClose } = props;
    let action = [];
    const messageClasses = cx({
        [classes.iconMessage]: icon !== undefined
    });
    const actualMessage = message.indexOf("\n") <= -1 ? message : message.split("\n");

    if (close !== undefined) {
        action = [
            <IconButton
                className={classes.iconButton}
                key="close"
                aria-label="Close"
                color="inherit"
                onClick={() => props.closeNotification()}
                size="large"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <Close className={classes.close} />
            </IconButton>
        ];
    }

    return (
        <StyledSnackbar
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
    message: PropTypes.node.isRequired,
    color: PropTypes.oneOf(["info", "success", "warning", "danger", "primary"]),
    close: PropTypes.bool,
    icon: PropTypes.object,
    place: PropTypes.oneOf(["tl", "tr", "tc", "br", "bl", "bc"]),
    open: PropTypes.bool
};

export default CustomSnackbar;
