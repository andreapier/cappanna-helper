import { CssBaseline, withStyles } from "@material-ui/core";
import appRoutes from "routes";
import appStyle from "variables/styles/appStyle";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import history from "./../../history";
import { Provider } from "react-redux";
import ConnectedRequireAuth from "containers/ConnectedRequireAuth";
import ConnectedSidebar from "containers/ConnectedSidebar";
import ConnectedWaitDialog from "containers/ConnectedWaitDialog";
import ConnectedNotificationSnackbar from "containers/ConnectedNotificationSnackbar";
import RoutingAwareHeader from "containers/RoutingAwareHeader";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import signinRoute from "routes/users/signin";

const switchRoutes = (routes) => (
    <Switch>
        {routes.map((route, key) => {
            if (route.redirect) {
                return <Route path={route.path} render={() => <Redirect to={route.to}/>} key={key} />;
            }

            if (route.protected) {
                return (
                    <Route
                        key={key}
                        exact
                        component={() => 
                            (<ConnectedRequireAuth redirectTo={signinRoute.path} roles={route.roles}>
                                {route.component}
                            </ConnectedRequireAuth>)
                        }
                        path={route.path}
                    />
                );
            }

            return <Route path={route.path} component={route.component} key={key} exact />;
        })}
    </Switch>
);

class App extends Component {
    constructor(props) {
        super(props);

        this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
        this.handleSidebarNavigationItemClick = this.handleSidebarNavigationItemClick.bind(this);
        this.mainPanelRef = React.createRef();
    }

    state = {
        mobileOpen: false
    };

    componentDidUpdate() {
        this.mainPanelRef.current.scrollTop = 0;
    }

    handleDrawerToggle() {
        this.setState({ mobileOpen: !this.state.mobileOpen });
    }

    handleSidebarNavigationItemClick() {
        this.setState({ mobileOpen: false });
    }

    render() {
        return (
            <Provider store={this.props.store}>
                <Router history={history}>
                    <div className={this.props.classes.wrapper}>
                        <MuiThemeProvider theme={this.props.theme}>
                            <CssBaseline />
                            <ConnectedWaitDialog />
                            <ConnectedNotificationSnackbar />
                            <ConnectedSidebar
                                routes={appRoutes}
                                handleDrawerToggle={this.handleDrawerToggle}
                                handleSidebarNavigationItemClick={this.handleSidebarNavigationItemClick}
                                open={this.state.mobileOpen}
                            />
                            <div className={this.props.classes.mainPanel} ref={this.mainPanelRef}>
                                <RoutingAwareHeader handleDrawerToggle={this.handleDrawerToggle} routes={appRoutes} />
                                <div className={this.props.classes.content}>
                                    <div className={this.props.classes.container}>{switchRoutes(appRoutes)}</div>
                                </div>
                            </div>
                        </MuiThemeProvider>
                    </div>
                </Router>
            </Provider>
        );
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
};

export default withStyles(appStyle)(App);
