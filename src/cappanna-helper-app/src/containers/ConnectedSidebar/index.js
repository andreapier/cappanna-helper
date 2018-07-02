import React, { Component } from "react";
import { connect } from "react-redux";
import Sidebar from "components/Sidebar";
import { withRouter } from "react-router-dom";

class ConnectedSidebar extends Component {
  render() {
    return <Sidebar {...this.props} />;
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
    location: ownProps.location,
    match: ownProps.match
  };
};

export default withRouter(connect(mapStateToProps)(ConnectedSidebar));
