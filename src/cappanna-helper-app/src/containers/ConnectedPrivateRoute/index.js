import React, { Component } from "react";
import { connect } from "react-redux";
import PrivateRoute from "components/PrivateRoute";

class ConnectedPrivateRoute extends Component {
  render() {
    return <PrivateRoute {...this.props} />;
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(ConnectedPrivateRoute);
