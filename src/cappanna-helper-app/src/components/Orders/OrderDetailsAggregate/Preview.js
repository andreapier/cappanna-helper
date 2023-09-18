import React from "react";
import PropTypes from "prop-types";
import { ListItemButton, ListItemText } from "@mui/material";
import { makeStyles } from '@mui/styles';
import sidebarStyle from "variables/styles/sidebarStyle";
import Checkbox from "components/CustomCheckbox";

const useStyles = makeStyles(sidebarStyle);

const Preview = (props) => {
    const classes = useStyles();
    const text = `Ordine N° ${props.order.shiftCounter} - ${props.order.createdBy.userName} (Tav. ${props.order.chTable})`;

    return (
        <ListItemButton className={classes.itemLink} onClick={() => props.toggleOrderSelectionForAggregation(props.order.id)}>
            <Checkbox checked={props.order.selected} disableRipple disableTouchRipple />
            <ListItemText primary={text} className={classes.itemText} disableTypography />
        </ListItemButton>
    );
};

Preview.propTypes = {
    order: PropTypes.shape({
        id: PropTypes.number.isRequired,
        shiftCounter: PropTypes.number.isRequired,
        chTable: PropTypes.string.isRequired,
        createdBy: PropTypes.shape({
            userName: PropTypes.string.isRequired
        }).isRequired,
        selected: PropTypes.bool.isRequired
    }).isRequired,
    toggleOrderSelectionForAggregation: PropTypes.func.isRequired
};

export default Preview;
