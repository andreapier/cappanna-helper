import React from "react";
import PropTypes from "prop-types";
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { withStyles } from '@mui/styles';
import { NavLink } from "react-router-dom";
import sidebarStyle from "variables/styles/sidebarStyle";
import Print from "@mui/icons-material/Print";
import Done from "@mui/icons-material/Done";
import PrintDisabled from "@mui/icons-material/PrintDisabled";

const Preview = (props) => {
    let text = `Ordine: ${props.order.shiftCounter}, Cliente: ${props.order.customer}, `;
    if (!props.filters.user) {
        text += `Cameriere: ${props.order.createdBy.userName}, `;
    }
    text += `Tav: ${props.order.chTable}`;

    const printed = props.order.status === 3;
    const closed = props.order.status === 4;

    return (
        <NavLink to={`/order/${props.order.id}`} className={props.classes.item}>
            <ListItem button className={props.classes.itemLink}>
                <ListItemText primary={text} className={props.classes.itemText} disableTypography />
                <ListItemIcon>{closed ? <Done /> : printed ? <Print /> : <PrintDisabled />}</ListItemIcon>
            </ListItem>
        </NavLink>
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
    classes: PropTypes.object.isRequired
};

export default withStyles(sidebarStyle)(Preview);
