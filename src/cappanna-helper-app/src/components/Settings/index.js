import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadSettingsListRequested, resetOrder, setSettingValue } from "actions";
import { List } from "@material-ui/core";
import SettingsItem from "components/Settings/SettingsItem";

const SettingsList = () => {
    const settings = useSelector(state => state.settings);
    const dispatch = useDispatch();
    const handleSetSettingValue = (id, value) => dispatch(setSettingValue(id, value));

    useEffect(() => {
        dispatch(loadSettingsListRequested());

        return () => {
            dispatch(resetOrder())
        };
    }, [dispatch])

    return (
        <List>
            {settings.map((o) => (
                <SettingsItem setting={o} key={o.id} setSettingValue={handleSetSettingValue} />
            ))}
        </List>
    );
}

export default SettingsList;
