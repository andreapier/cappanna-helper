import { Drawer, Hidden } from "@mui/material";
import { styled } from '@mui/material/styles';
import React from "react";
import Links from "components/Sidebar/Links";
import Logo from "components/Sidebar/Logo";
import { useSelector } from "react-redux";
import { drawerWidth, transition, boxShadow } from "variables/styles";

const StyledDrawer = styled(Drawer)(({ theme }) => ({
    border: "none",
    //zIndex: "1",
    ...boxShadow,
    width: drawerWidth,
    [theme.breakpoints.up("md")]: {
        width: drawerWidth,
        position: "fixed",
        height: "100%"
    },
    [theme.breakpoints.down('md')]: {
        width: drawerWidth,
        ...boxShadow,
        height: "100vh",
        //zIndex: "1032",
        //visibility: "visible",
        overflowY: "visible",
        borderTop: "none",
        textAlign: "left",
        ...transition
    },
}));

const Sidebar = props => {
    const user = useSelector(state => state.user);
    const { routes, handleSidebarNavigationItemClick } = props;

    return [
        <Hidden key="drawerMdUp" mdUp>
            <StyledDrawer open={props.open} PaperProps={{ style: { width: drawerWidth } }} onClose={props.handleDrawerToggle} ModalProps={{ keepMounted: true }}>
                <Logo />
                <Links routes={routes} user={user} handleSidebarNavigationItemClick={handleSidebarNavigationItemClick} />
            </StyledDrawer>
        </Hidden>,
        <Hidden key="drawerMdDown" mdDown>
            <StyledDrawer variant="permanent" open PaperProps={{ style: { width: drawerWidth } }} >
                <Logo />
                <Links routes={routes} user={user} handleSidebarNavigationItemClick={handleSidebarNavigationItemClick} />
            </StyledDrawer>
        </Hidden>
    ];
};

export default Sidebar;
