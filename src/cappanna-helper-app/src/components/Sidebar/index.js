import { Drawer, Hidden, withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
import sidebarStyle from "variables/styles/sidebarStyle";
import Links from "components/Sidebar/Links";
import Logo from "components/Sidebar/Logo";
import { useSelector } from "react-redux";

const Sidebar = (props) => {
    const user = useSelector(state => state.user);
    const { classes, routes, handleSidebarNavigationItemClick } = props;

    return (
        <div>
            <Hidden mdUp>
                <Drawer open={props.open} classes={{ paper: classes.drawerPaper }} onClose={props.handleDrawerToggle} ModalProps={{ keepMounted: true }}>
                    <Logo />
                    <Links routes={routes} user={user} handleSidebarNavigationItemClick={handleSidebarNavigationItemClick} />
                </Drawer>
            </Hidden>
            <Hidden smDown>
                <Drawer variant="permanent" open classes={{ paper: classes.drawerPaper }}>
                    <Logo />
                    <Links routes={routes} user={user} handleSidebarNavigationItemClick={handleSidebarNavigationItemClick} />
                </Drawer>
            </Hidden>
        </div>
    );
};

Sidebar.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(sidebarStyle)(Sidebar);
