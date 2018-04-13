import React, { Component } from "react";
import { connect } from "react-redux";
import Sidebar from "./../../components/Sidebar";

class ConnectedSidebar extends Component {
  render() {
    return <Sidebar {...this.props} />;
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(ConnectedSidebar);
