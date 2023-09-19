import React, { useEffect, useRef, useState } from "react";
import { styled } from '@mui/material/styles';
import { CssBaseline } from "@mui/material";
import appRoutes from "routes";
import { drawerWidth, transition, container } from "variables/styles";
import { Route, Routes, Navigate } from "react-router-dom";
import RequireAuth from "components/RequireAuth";
import Sidebar from "components/Sidebar";
import WaitDialog from "components/WaitDialog";
import NotificationSnackbar from "components/Snackbar/NotificationSnackbar";
import RoutingAwareHeader from "components/RoutingAwareHeader";
import signinRoute from "routes/users/signin";

const PREFIX = 'ThemedApp';

const classes = {
    wrapper: `${PREFIX}-wrapper`,
    mainPanel: `${PREFIX}-mainPanel`,
    content: `${PREFIX}-content`,
    container: `${PREFIX}-container`
};

const Root = styled('div')(({ theme }) => ({
    [`&.${classes.wrapper}`]: {
        position: "relative",
        top: "0",
        height: "100vh"
    },
    [`& .${classes.mainPanel}`]: {
        [theme.breakpoints.up("md")]: {
            width: `calc(100% - ${drawerWidth})`
        },
        overflow: "auto",
        position: "relative",
        float: "right",
        ...transition,
        maxHeight: "100%",
        width: "100%",
        overflowScrolling: "touch"
    },
    [`& .${classes.content}`]: {
        padding: "10px 0px",
        minHeight: "calc(100% - 123px)"
    },

    [`& .${classes.container}`]: container
}));

const switchRoutes = (routes) => (
    <Routes>
        {routes.map((route, key) => {
            if (route.redirect) {
                return <Route path={route.path} element={<Navigate replace to={route.to}/>} key={key} />;
            }

            if (route.protected) {
                return (
                    <Route
                        key={key}
                        exact
                        element={
                            (<RequireAuth redirectTo={signinRoute.path} roles={route.roles}>
                                {route.component}
                            </RequireAuth>)
                        }
                        path={route.path}
                    />
                );
            }

            return <Route path={route.path} element={route.component()} key={key} exact />;
        })}
    </Routes>
);

const ThemedApp = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const mainPanelRef = useRef();


    const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
    const handleSidebarNavigationItemClick = () => setMobileOpen(false);

    useEffect(() => {
        mainPanelRef.current.scrollTop = 0;
    }, []);

    return (
        <Root className={classes.wrapper}>
            <CssBaseline />
            <WaitDialog />
            <NotificationSnackbar />
            <Sidebar
                routes={appRoutes}
                handleDrawerToggle={handleDrawerToggle}
                handleSidebarNavigationItemClick={handleSidebarNavigationItemClick}
                open={mobileOpen}
            />
            <div className={classes.mainPanel} ref={mainPanelRef}>
                <RoutingAwareHeader handleDrawerToggle={handleDrawerToggle} routes={appRoutes} />
                <div className={classes.content}>
                    <div className={classes.container}>{switchRoutes(appRoutes)}</div>
                </div>
            </div>
        </Root>
    );
}

export default ThemedApp;
