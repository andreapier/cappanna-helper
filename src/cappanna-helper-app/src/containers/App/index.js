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

const switchRoutes = (
  <Switch>
    {appRoutes.map((prop, key) => {
      if (prop.redirect) {
        return <Redirect from={prop.path} to={prop.to} key={key} />;
      }

      if (prop.protected) {
        return (
          <ConnectedPrivateRoute
            path={prop.path}
            component={prop.component}
            key={key}
            exact
          />
        );
      }

      return (
        <Route path={prop.path} component={prop.component} key={key} exact />
      );
    })}
  </Switch>
);

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
    const { classes } = this.props;

    return (
      <Provider store={this.props.store}>
        <Router history={history}>
          <div className={classes.wrapper}>
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
            <div className={classes.mainPanel} ref={this.mainPanelRef}>
              <RoutingAwareHeader
                handleDrawerToggle={this.handleDrawerToggle}
                routes={appRoutes}
              />
              <div className={classes.content}>
                <div className={classes.container}>{switchRoutes}</div>
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
