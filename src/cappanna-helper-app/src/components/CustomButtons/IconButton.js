import React from "react";
import { IconButton } from "@mui/material";
import { makeStyles } from '@mui/styles';
import PropTypes from "prop-types";
import iconButtonStyle from "variables/styles/iconButtonStyle";

const useStyles = makeStyles(iconButtonStyle);

const IconCustomButton = (props) => {
    const classes = useStyles();
    const { color, children, customClass, ...rest } = props;
    const colorWithDisabled = props.disabled ? "" : color;

    return (
        <IconButton
            {...rest}
            className={classes.button + " " + classes[colorWithDisabled] + (customClass ? " " + customClass : "")}
            size="large">
            {children}
        </IconButton>
    );
};

IconCustomButton.defaultProps = {
    color: "primary"
};

IconCustomButton.propTypes = {
    color: PropTypes.oneOf(["primary", "success", "warning", "danger", "white", "simple"]),
    customClass: PropTypes.string,
    disabled: PropTypes.bool
};

export default IconCustomButton;
