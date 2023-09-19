import React from "react";
import { styled } from '@mui/material/styles';
import PropTypes from "prop-types";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { NavLink } from "react-router-dom";
import { item, itemLink, itemText } from "variables/styles/sidebarStyle";
import Print from "@mui/icons-material/Print";
import Done from "@mui/icons-material/Done";
import PrintDisabled from "@mui/icons-material/PrintDisabled";

const PREFIX = 'Preview';

const classes = {
    item: `${PREFIX}-item`,
    itemLink: `${PREFIX}-itemLink`,
    itemText: `${PREFIX}-itemText`
};

const StyledNavLink = styled(NavLink)(
    { [`&.${classes.item}`]: item, [`& .${classes.itemLink}`]: itemLink, [`& .${classes.itemText}`]: itemText }
);

const Preview = props => {
    let text = `Ordine: ${props.order.shiftCounter}, Cliente: ${props.order.customer}, `;
    if (!props.filters.user) {
        text += `Cameriere: ${props.order.createdBy.userName}, `;
    }
    text += `Tav: ${props.order.chTable}`;

    const printed = props.order.status === 3;
    const closed = props.order.status === 4;

    return (
        <StyledNavLink to={`/order/${props.order.id}`} className={classes.item}>
            <ListItemButton className={classes.itemLink}>
                <ListItemText primary={text} className={classes.itemText} disableTypography />
                <ListItemIcon>{closed ? <Done /> : printed ? <Print /> : <PrintDisabled />}</ListItemIcon>
            </ListItemButton>
        </StyledNavLink>
    );
};

Preview.propTypes = {
    order: PropTypes.shape({
        id: PropTypes.number.isRequired,
        shiftCounter: PropTypes.number.isRequired,
        chTable: PropTypes.string.isRequired,
        customer: PropTypes.string.isRequired,
        status: PropTypes.number.isRequired,
        createdBy: PropTypes.shape({
            userName: PropTypes.string.isRequired
        }).isRequired
    }).isRequired,
    filters: PropTypes.object.isRequired,
};

export default Preview;
