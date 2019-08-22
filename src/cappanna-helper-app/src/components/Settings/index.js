import React from "react";
import PropTypes from "prop-types";
import {
  FormControlLabel,
  ListItem,
  Switch,
  TextField,
  withStyles
} from "@material-ui/core";
import sidebarStyle from "variables/styles/sidebarStyle";

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
