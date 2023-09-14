import React from "react";
import PropTypes from "prop-types";
import { Checkbox, withStyles } from "@material-ui/core";
import checkboxStyle from "variables/styles/checkboxStyle";

const CustomCheckbox = (props) => {
    const { id, classes, ...inputProps } = props;

    return (
        <Checkbox
            classes={{
                root: classes.root
            }}
            id={id}
            color="primary"
            {...inputProps}
        />
    );
};

CustomCheckbox.propTypes = {
    classes: PropTypes.object.isRequired,
    id: PropTypes.string
};

export default withStyles(checkboxStyle)(CustomCheckbox);
