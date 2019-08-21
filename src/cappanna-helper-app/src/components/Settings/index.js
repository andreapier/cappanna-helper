import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import sidebarStyle from "variables/styles/sidebarStyle";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";
import ListItem from "@material-ui/core/ListItem";

const Setting = props => {
  let element;

  if (props.setting.type === "Boolean") {
    element = (
      <Switch
        checked={props.setting.value.toLowerCase() === "true"}
        onChange={e =>
          props.setSettingValue(props.setting.id, `${e.target.checked}`)
        }
      />
    );
  } else {
    element = (
      <TextField
        value={props.setting.value}
        onChange={e => props.setSettingValue(props.setting.id, e.target.value)}
      />
    );
  }

  return (
    <ListItem className={props.classes.item}>
      <FormControlLabel
        control={element}
        label={props.setting.name}
        labelPlacement="start"
      />
    </ListItem>
  );
};

Setting.propTypes = {
  setting: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
  }).isRequired,
  classes: PropTypes.object.isRequired,
  setSettingValue: PropTypes.func.isRequired
};

export default withStyles(sidebarStyle)(Setting);
