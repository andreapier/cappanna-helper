import Clear from "@material-ui/icons/Clear";
import Check from "@material-ui/icons/Check";
import { FormControl, Input, InputLabel, withStyles } from "@material-ui/core";
import customInputStyle from "variables/styles/customInputStyle";
import cx from "classnames";
import PropTypes from "prop-types";
import React from "react";

function CustomInput({ ...props }) {
  const {
    classes,
    formControlProps,
    labelText,
    id,
    labelProps,
    inputProps,
    error,
    success
  } = props;

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
    <FormControl
      {...formControlProps}
      className={formControlProps.className + " " + classes.formControl}
    >
      {labelText !== undefined ? (
        <InputLabel
          className={classes.labelRoot + labelClasses}
          htmlFor={id}
          {...labelProps}
        >
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
    </FormControl>
  );
}

CustomInput.propTypes = {
  classes: PropTypes.object.isRequired,
  labelText: PropTypes.node,
  labelProps: PropTypes.object,
  id: PropTypes.string,
  inputProps: PropTypes.object,
  formControlProps: PropTypes.object,
  error: PropTypes.bool,
  success: PropTypes.bool
};

export default withStyles(customInputStyle)(CustomInput);
