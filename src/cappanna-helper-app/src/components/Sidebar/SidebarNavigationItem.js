import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { styled } from '@mui/material/styles';
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import React from "react";
import { item, itemIcon, itemLink, itemText } from "variables/styles/sidebarStyle";

const PREFIX = 'SidebarNavigationItem';

const classes = {
    item: `${PREFIX}-item`,
    itemIcon: `${PREFIX}-itemIcon`,
    itemLink: `${PREFIX}-itemLink`,
    itemText: `${PREFIX}-itemText`
};

const StyledNavLink = styled(NavLink)(
    { [`&.${classes.item}`]: item, [`& .${classes.itemIcon}`]: itemIcon, [`& .${classes.itemLink}`]: itemLink, [`& .${classes.itemText}`]: itemText }
);

const signinRoute = routeName => routeName === "signin";

const SidebarNavigationItem = props => {
    const { routeData, user, handleSidebarNavigationItemClick } = props;

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

    return (
        <StyledNavLink to={routeData.path} className={classes.item} onClick={handleSidebarNavigationItemClick}>
            <ListItemButton className={classes.itemLink}>
                <ListItemIcon className={classes.itemIcon}>
                    <routeData.icon />
                </ListItemIcon>
                <ListItemText primary={routeData.sidebarName} className={classes.itemText} disableTypography />
            </ListItemButton>
        </StyledNavLink>
    );
};

SidebarNavigationItem.propTypes = {
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

export default SidebarNavigationItem;
