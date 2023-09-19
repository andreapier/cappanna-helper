import React from "react";
import { styled } from '@mui/material/styles';
import PropTypes from "prop-types";
import { ListItemButton, ListItemText } from "@mui/material";
import { item, itemLink, itemText } from "variables/styles/sidebarStyle";
import Checkbox from "components/CustomCheckbox";

const PREFIX = 'Preview';

const classes = {
    item: `${PREFIX}-item`,
    itemLink: `${PREFIX}-itemLink`,
    itemText: `${PREFIX}-itemText`
};

const StyledListItemButton = styled(ListItemButton)(
    { [`& .${classes.item}`]: item, [`&.${classes.itemLink}`]: itemLink, [`& .${classes.itemText}`]: itemText }
);

const Preview = props => {
    const text = `Ordine N° ${props.order.shiftCounter} - ${props.order.createdBy.userName} (Tav. ${props.order.chTable})`;

    return (
        <StyledListItemButton className={classes.itemLink} onClick={() => props.toggleOrderSelectionForAggregation(props.order.id)}>
            <Checkbox checked={props.order.selected} disableRipple disableTouchRipple />
            <ListItemText primary={text} className={classes.itemText} disableTypography />
        </StyledListItemButton>
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
