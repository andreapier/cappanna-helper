import { Drawer, Hidden } from "@mui/material";
import { makeStyles } from '@mui/styles';
import React from "react";
import sidebarStyle from "variables/styles/sidebarStyle";
import Links from "components/Sidebar/Links";
import Logo from "components/Sidebar/Logo";
import { useSelector } from "react-redux";

const useStyles = makeStyles(sidebarStyle);

const Sidebar = (props) => {
    const classes = useStyles();
    const user = useSelector(state => state.user);
    const { routes, handleSidebarNavigationItemClick } = props;

    return (
        <div>
            <Hidden mdUp>
                <Drawer open={props.open} classes={{ paper: classes.drawerPaper }} onClose={props.handleDrawerToggle} ModalProps={{ keepMounted: true }}>
                    <Logo />
                    <Links routes={routes} user={user} handleSidebarNavigationItemClick={handleSidebarNavigationItemClick} />
                </Drawer>
            </Hidden>
            <Hidden mdDown>
                <Drawer variant="permanent" open classes={{ paper: classes.drawerPaper }}>
                    <Logo />
                    <Links routes={routes} user={user} handleSidebarNavigationItemClick={handleSidebarNavigationItemClick} />
                </Drawer>
            </Hidden>
        </div>
    );
};

export default Sidebar;
