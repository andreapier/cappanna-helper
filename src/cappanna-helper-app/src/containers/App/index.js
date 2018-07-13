import { withStyles } from "@material-ui/core/styles";
import appRoutes from "routes";
import appStyle from "variables/styles/appStyle";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import history from "./../../history";
import { Provider } from "react-redux";
import ConnectedPrivateRoute from "containers/ConnectedPrivateRoute";
import ConnectedSidebar from "containers/ConnectedSidebar";
import ConnectedWaitDialog from "containers/ConnectedWaitDialog";
import ConnectedErrorSnackbar from "containers/ConnectedErrorSnackbar";
import RoutingAwareHeader from "containers/RoutingAwareHeader";
import CssBaseline from "@material-ui/core/CssBaseline";

const switchRoutes = routes =>
  routes.map((route, key) => {
    if (route.redirect) {
      return <Redirect from={route.path} to={route.to} key={key} />;
    }

    if (route.subroutes && route.subroutes.length > 0) {
      return switchRoutes(route.subroutes);
    }

    if (route.protected) {
      return (
        <ConnectedPrivateRoute
          path={route.path}
          component={route.component}
          key={key}
          exact
        />
      );
    }

    return (
      <Route path={route.path} component={route.component} key={key} exact />
    );
  });

const renderRoutes = <Switch>{switchRoutes(appRoutes)}</Switch>;

class App extends Component {
  constructor(props) {
    super(props);

    this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
    this.handleSidebarNavigationItemClick = this.handleSidebarNavigationItemClick.bind(
      this
    );
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
            <CssBaseline />
            <ConnectedWaitDialog />
            <ConnectedErrorSnackbar />
            <ConnectedSidebar
              routes={appRoutes}
              handleDrawerToggle={this.handleDrawerToggle}
              handleSidebarNavigationItemClick={
                this.handleSidebarNavigationItemClick
              }
              open={this.state.mobileOpen}
            />
            <div
              className={this.props.classes.mainPanel}
              ref={this.mainPanelRef}
            >
              <RoutingAwareHeader
                handleDrawerToggle={this.handleDrawerToggle}
                routes={appRoutes}
              />
              <div className={this.props.classes.content}>
                <div className={this.props.classes.container}>
                  {renderRoutes()}
                </div>
              </div>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(appStyle)(App);
