import React from "react";
import PropTypes from "prop-types";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { makeStyles } from '@mui/styles';
import { NavLink } from "react-router-dom";
import sidebarStyle from "variables/styles/sidebarStyle";
import Print from "@mui/icons-material/Print";
import Done from "@mui/icons-material/Done";
import PrintDisabled from "@mui/icons-material/PrintDisabled";

const useStyles = makeStyles(sidebarStyle);

const Preview = (props) => {
    const classes = useStyles();
    let text = `Ordine: ${props.order.shiftCounter}, Cliente: ${props.order.customer}, `;
    if (!props.filters.user) {
        text += `Cameriere: ${props.order.createdBy.userName}, `;
    }
    text += `Tav: ${props.order.chTable}`;

    const printed = props.order.status === 3;
    const closed = props.order.status === 4;

    return (
        <NavLink to={`/order/${props.order.id}`} className={classes.item}>
            <ListItemButton className={classes.itemLink}>
                <ListItemText primary={text} className={classes.itemText} disableTypography />
                <ListItemIcon>{closed ? <Done /> : printed ? <Print /> : <PrintDisabled />}</ListItemIcon>
            </ListItemButton>
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
};

export default Preview;
