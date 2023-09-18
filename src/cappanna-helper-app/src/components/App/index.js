import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { CssBaseline, withStyles } from "@material-ui/core";
import appRoutes from "routes";
import NavigateSetter from "./NaviagteSetter";
import appStyle from "variables/styles/appStyle";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import RequireAuth from "components/RequireAuth";
import Sidebar from "components/Sidebar";
import WaitDialog from "components/WaitDialog";
import NotificationSnackbar from "components/Snackbar/NotificationSnackbar";
import RoutingAwareHeader from "components/RoutingAwareHeader";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import signinRoute from "routes/users/signin";

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

const App = props => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const mainPanelRef = useRef();

    const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
    const handleSidebarNavigationItemClick = () => setMobileOpen(false);

    useEffect(() => {
        mainPanelRef.current.scrollTop = 0;
    }, []);

        return (
            <Provider store={props.store}>
                <BrowserRouter>
                    <NavigateSetter />
                    <div className={props.classes.wrapper}>
                        <MuiThemeProvider theme={props.theme}>
                            <CssBaseline />
                            <WaitDialog />
                            <NotificationSnackbar />
                            <Sidebar
                                routes={appRoutes}
                                handleDrawerToggle={handleDrawerToggle}
                                handleSidebarNavigationItemClick={handleSidebarNavigationItemClick}
                                open={mobileOpen}
                            />
                            <div className={props.classes.mainPanel} ref={mainPanelRef}>
                                <RoutingAwareHeader handleDrawerToggle={handleDrawerToggle} routes={appRoutes} />
                                <div className={props.classes.content}>
                                    <div className={props.classes.container}>{switchRoutes(appRoutes)}</div>
                                </div>
                            </div>
                        </MuiThemeProvider>
                    </div>
                </BrowserRouter>
            </Provider>
        );
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
};

export default withStyles(appStyle)(App);
