import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { withStyles } from '@mui/styles';
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import React from "react";
import sidebarStyle from "variables/styles/sidebarStyle";

const signinRoute = (routeName) => routeName === "signin";

const SidebarNavigationItem = (props) => {
    const { routeData, user, classes, handleSidebarNavigationItemClick, active } = props;
    if (routeData.redirect) {
        return null;
    }

    if (!routeData.sidebarName) {
        return null;
    }

    if (routeData.protected && !user.token) {
        return null;
    }

    if (routeData.protected && !routeData.roles.some((r) => user.roles.includes(r))) {
        return null;
    }

    if (user.token && signinRoute(routeData.name)) {
        return null;
    }

    const selectedItemLinkClasses = active ? classes.selectedItemLink : "";

    return (
        <NavLink to={routeData.path} className={classes.item} onClick={handleSidebarNavigationItemClick}>
            <ListItem button className={classes.itemLink + selectedItemLinkClasses}>
                <ListItemIcon className={classes.itemIcon}>
                    <routeData.icon />
                </ListItemIcon>
                <ListItemText primary={routeData.sidebarName} className={classes.itemText} disableTypography />
            </ListItem>
        </NavLink>
    );
};

SidebarNavigationItem.propTypes = {
    classes: PropTypes.object.isRequired,
    handleSidebarNavigationItemClick: PropTypes.func.isRequired,
    user: PropTypes.shape({
        roles: PropTypes.arrayOf(PropTypes.string).isRequired,
        token: PropTypes.string
    }).isRequired,
    routeData: PropTypes.shape({
        redirect: PropTypes.bool,
        sidebarName: PropTypes.string,
        protected: PropTypes.bool,
        roles: PropTypes.arrayOf(PropTypes.string),
        name: PropTypes.string,
        path: PropTypes.string.isRequired
    }).isRequired
};

export default withStyles(sidebarStyle)(SidebarNavigationItem);
