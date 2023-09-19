import React from "react";
import { styled } from '@mui/material/styles';
import PropTypes from "prop-types";
import { FormControlLabel, ListItem, Switch, TextField } from "@mui/material";
import { item } from "variables/styles/sidebarStyle";

const PREFIX = 'SettingsItem';

const classes = {
    item: `${PREFIX}-item`
};

const StyledListItem = styled(ListItem)({ [`&.${classes.item}`]: item });

const SettingsItem = props => {
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
        <StyledListItem className={classes.item}>
            <FormControlLabel control={element} label={props.setting.name} labelPlacement="start" />
        </StyledListItem>
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
