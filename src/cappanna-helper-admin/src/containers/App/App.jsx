import "perfect-scrollbar/css/perfect-scrollbar.css";
import { Header, Footer, Sidebar } from "components";
import { Switch, Route, Redirect } from "react-router-dom";
import { withStyles } from "material-ui";
import appRoutes from "routes/app.jsx";
import appStyle from "variables/styles/appStyle.jsx";
import image from "assets/img/sidebar-2.jpg";
import logo from "assets/img/logo.png";
import PerfectScrollbar from "perfect-scrollbar";
import PropTypes from "prop-types";
import React from "react";

const switchRoutes = (
  <Switch>
    {appRoutes.map((prop, key) => {
      if (prop.redirect) {
        return <Redirect from={prop.path} to={prop.to} key={key} />;
      }

      return <Route path={prop.path} component={prop.component} key={key} />;
    })}
  </Switch>
);

class App extends React.Component {
  state = {
    mobileOpen: false
  };

  componentDidMount() {
    if(navigator.platform.indexOf('Win') > -1){
      // eslint-disable-next-line
      const ps = new PerfectScrollbar(this.refs.mainPanel);
    }
  }

  componentDidUpdate() {
    this.refs.mainPanel.scrollTop = 0;
  }

  getRoute() {
    return this.props.location.pathname !== "/maps";
  }

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  }

  render() {
    const { classes, ...rest } = this.props;
    return (
      <div className={classes.wrapper}>
        <Sidebar
            routes={appRoutes}
            logoText={"Cappanna Helper"}
            logo={logo}
            image={image}
            handleDrawerToggle={this.handleDrawerToggle}
            open={this.state.mobileOpen}
            color="blue"
            {...rest}
        />
        <div className={classes.mainPanel} ref="mainPanel">
          <Header
              routes={appRoutes}
              handleDrawerToggle={this.handleDrawerToggle}
              {...rest}
          />
            <div className={classes.content}>
              <div className={classes.container}>{switchRoutes}</div>
            </div>
          {this.getRoute() ? <Footer /> : null}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(appStyle)(App);
