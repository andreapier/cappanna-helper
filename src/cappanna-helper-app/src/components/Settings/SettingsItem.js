import React from "react";
import PropTypes from "prop-types";
import { FormControlLabel, ListItem, Switch, TextField } from "@mui/material";
import { makeStyles } from '@mui/styles';
import sidebarStyle from "variables/styles/sidebarStyle";

const useStyles = makeStyles(sidebarStyle);

const SettingsItem = (props) => {
    const classes = useStyles();
    let element;

    if (props.setting.type === "Boolean") {
        element = (
            <Switch checked={props.setting.value.toLowerCase() === "true"} onChange={(e) => props.setSettingValue(props.setting.id, `${e.target.checked}`)} />
        );
    } else {
        element = <TextField
            variant="standard"
            value={props.setting.value}
            onChange={(e) => props.setSettingValue(props.setting.id, e.target.value)} />;
    }

    return (
        <ListItem className={classes.item}>
            <FormControlLabel control={element} label={props.setting.name} labelPlacement="start" />
        </ListItem>
    );
};

SettingsItem.propTypes = {
    setting: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired
    }).isRequired,
    setSettingValue: PropTypes.func.isRequired
};

export default SettingsItem;
