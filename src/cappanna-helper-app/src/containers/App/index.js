import { withStyles } from "@material-ui/core";
import appRoutes from "routes";
import appStyle from "variables/styles/appStyle";
import logo from "assets/img/logo.png";
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
    this.mainPanelRef = React.createRef();
  }

  state = {
    mobileOpen: false
  };

  componentDidUpdate() {
    this.mainPanelRef.scrollTop = 0;
  }

  handleDrawerToggle() {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  }

  render() {
    const { classes, ...rest } = this.props;

    return (
      <Provider store={this.props.store}>
        <Router history={history}>
          <div className={classes.wrapper}>
            <CssBaseline />
            <ConnectedWaitDialog />
            <ConnectedErrorSnackbar />
            <ConnectedSidebar
              routes={appRoutes}
              logoText={"Cappanna Helper"}
              logo={logo}
              handleDrawerToggle={this.handleDrawerToggle}
              open={this.state.mobileOpen}
              color="blue"
              {...rest}
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
