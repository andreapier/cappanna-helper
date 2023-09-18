import React, { useEffect, useRef, useState } from "react";
import { CssBaseline } from "@mui/material";
import { makeStyles } from '@mui/styles';
import appRoutes from "routes";
import appStyle from "variables/styles/appStyle";
import { Route, Routes, Navigate } from "react-router-dom";
import RequireAuth from "components/RequireAuth";
import Sidebar from "components/Sidebar";
import WaitDialog from "components/WaitDialog";
import NotificationSnackbar from "components/Snackbar/NotificationSnackbar";
import RoutingAwareHeader from "components/RoutingAwareHeader";
import signinRoute from "routes/users/signin";

const useStyles = makeStyles(appStyle);

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
    const classes = useStyles();

    const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
    const handleSidebarNavigationItemClick = () => setMobileOpen(false);

    useEffect(() => {
        mainPanelRef.current.scrollTop = 0;
    }, []);

    return (
      <div className={classes.wrapper}>
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
      </div>
    );
}

export default ThemedApp;
