import React from "react";
import PropTypes from "prop-types";
import { Checkbox } from "@mui/material";
import { makeStyles } from '@mui/styles';
import checkboxStyle from "variables/styles/checkboxStyle";

const useStyles = makeStyles(checkboxStyle);

const CustomCheckbox = (props) => {
    const classes = useStyles();
    const { id, ...inputProps } = props;

    return (
        <Checkbox
            classes={{
                root: classes.root
            }}
            id={id}
            {...inputProps}
        />
    );
};

CustomCheckbox.propTypes = {
    id: PropTypes.string
};

export default CustomCheckbox;
