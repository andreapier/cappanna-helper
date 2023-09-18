import React from "react";
import { Button } from "@mui/material";
import { makeStyles } from '@mui/styles';
import PropTypes from "prop-types";
import cx from "classnames";
import buttonStyle from "variables/styles/buttonStyle";

const useStyles = makeStyles(buttonStyle);

const RegularButton = (props) => {
    const classes = useStyles();
    const { color, round, children, fullWidth, disabled, ...rest } = props;
    const btnClasses = cx({
        [classes[color]]: color,
        [classes.round]: round,
        [classes.fullWidth]: fullWidth,
        [classes.disabled]: disabled
    });

    return (
        <Button {...rest} className={classes.button + " " + btnClasses}>
            {children}
        </Button>
    );
};

RegularButton.defaultProps = {
    color: "primary"
};

RegularButton.propTypes = {
    color: PropTypes.oneOf(["primary", "success", "warning", "danger", "white", "simple", "transparent"]),
    round: PropTypes.bool,
    fullWidth: PropTypes.bool,
    disabled: PropTypes.bool
};

export default RegularButton;
