import React from "react";
import PropTypes from "prop-types";
import { Checkbox } from "@mui/material";
import { withStyles } from '@mui/styles';
import checkboxStyle from "variables/styles/checkboxStyle";

const CustomCheckbox = (props) => {
    const { id, classes, ...inputProps } = props;

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
    classes: PropTypes.object.isRequired,
    id: PropTypes.string
};

export default withStyles(checkboxStyle)(CustomCheckbox);
