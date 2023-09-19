import React from "react";
import { styled } from '@mui/material/styles';
import PropTypes from "prop-types";
import { Checkbox } from "@mui/material";
import { primaryColor } from "variables/styles";

const PREFIX = 'CustomCheckbox';
const classes = {
    root: `${PREFIX}-root`
};

const StyledCheckbox = styled(Checkbox)({
    [`& .${classes.root}`]: {
        color: primaryColor
    }
});

const CustomCheckbox = props => {
    const { id, ...inputProps } = props;

    return (
        <StyledCheckbox
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
