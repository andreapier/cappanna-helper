import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import Header from "components/Header";
import { getActiveRoute } from "routes/helpers";

class RoutingAwareHeader extends Component {
  render() {
    const { routes, location, ...rest } = this.props;
    const selectedRoute = getActiveRoute(routes, location);
    const title = selectedRoute.headerTitle;

    return <Header title={title} {...rest} />;
  }
}

RoutingAwareHeader.propTypes = {
  location: PropTypes.object.isRequired,
  routes: PropTypes.array.isRequired
};

export default withRouter(RoutingAwareHeader);
