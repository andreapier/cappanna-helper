import React from "react";
import { styled } from '@mui/material/styles';
import PropTypes from "prop-types";
import Clear from "@mui/icons-material/Clear";
import Check from "@mui/icons-material/Check";
import { FormControl, Input, InputLabel } from "@mui/material";
import cx from "classnames";
import { primaryColor, dangerColor, successColor, defaultFont } from "variables/styles";

const PREFIX = 'CustomInput';

const classes = {
    disabled: `${PREFIX}-disabled`,
    underline: `${PREFIX}-underline`,
    underlineError: `${PREFIX}-underlineError`,
    underlineSuccess: `${PREFIX}-underlineSuccess`,
    labelRoot: `${PREFIX}-labelRoot`,
    labelRootError: `${PREFIX}-labelRootError`,
    labelRootSuccess: `${PREFIX}-labelRootSuccess`,
    feedback: `${PREFIX}-feedback`,
    marginTop: `${PREFIX}-marginTop`,
    formControl: `${PREFIX}-formControl`
};

const StyledFormControl = styled(FormControl)({
    [`& .${classes.disabled}`]: {
        "&:before": {
            backgroundColor: "transparent !important"
        }
    },
    [`& .${classes.underline}`]: {
        "&:before": {
            backgroundColor: "#D2D2D2",
            height: "1px !important"
        },
        "&:after": {
            backgroundColor: primaryColor
        }
    },
    [`& .${classes.underlineError}`]: {
        "&:after": {
            backgroundColor: dangerColor
        }
    },
    [`& .${classes.underlineSuccess}`]: {
        "&:after": {
            backgroundColor: successColor
        }
    },
    [`& .${classes.labelRoot}`]: {
        ...defaultFont,
        color: "#AAAAAA",
        fontWeight: "400",
        fontSize: "14px",
        lineHeight: "1.42857"
    },
    [`& .${classes.labelRootError}`]: {
        color: dangerColor
    },
    [`& .${classes.labelRootSuccess}`]: {
        color: successColor
    },
    [`& .${classes.feedback}`]: {
        position: "absolute",
        top: "18px",
        right: "0",
        zIndex: "2",
        display: "block",
        width: "24px",
        height: "24px",
        textAlign: "center",
        pointerEvents: "none"
    },
    [`& .${classes.marginTop}`]: {
        marginTop: "16px"
    },
    [`& .${classes.formControl}`]: {
        paddingBottom: "10px",
        margin: "27px 0 0 0",
        position: "relative"
    }
});

const CustomInput = (props) => {
    const { formControlProps, labelText, id, labelProps, inputProps, error, success } = props;

    const labelClasses = cx({
        [" " + classes.labelRootError]: error,
        [" " + classes.labelRootSuccess]: success && !error
    });
    const underlineClasses = cx({
        [classes.underlineError]: error,
        [classes.underlineSuccess]: success && !error,
        [classes.underline]: !success && !error
    });
    const marginTop = cx({
        [classes.marginTop]: labelText === undefined
    });

    return (
        <StyledFormControl
            variant="standard"
            {...formControlProps}
            className={formControlProps.className + " " + classes.formControl}>
            {labelText !== undefined ? (
                <InputLabel className={classes.labelRoot + labelClasses} htmlFor={id} {...labelProps}>
                    {labelText}
                </InputLabel>
            ) : null}
            <Input
                classes={{
                    root: marginTop,
                    disabled: classes.disabled,
                    underline: underlineClasses
                }}
                id={id}
                {...inputProps}
            />
            {error ? (
                <Clear className={classes.feedback + " " + classes.labelRootError} />
            ) : success ? (
                <Check className={classes.feedback + " " + classes.labelRootSuccess} />
            ) : null}
        </StyledFormControl>
    );
}

CustomInput.propTypes = {
    labelText: PropTypes.node,
    labelProps: PropTypes.object,
    id: PropTypes.string,
    inputProps: PropTypes.object,
    formControlProps: PropTypes.object,
    error: PropTypes.bool,
    success: PropTypes.bool
};

export default CustomInput;
