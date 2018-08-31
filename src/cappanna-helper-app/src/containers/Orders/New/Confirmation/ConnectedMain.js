import React, { Component } from "react";
import { connect } from "react-redux";
import Main from "components/Orders/New/Confirmation/Main";
import buildFilledOrderDetails from "utils/buildFilledOrderDetails";

class ConnectedMain extends Component {
  render() {
    return <Main {...this.props} />;
  }
}

const mapStateToProps = state => {
  return {
    details: buildFilledOrderDetails(state.newOrderDetails.filter(e => e.quantity > 0), state.menuDetails.items)
  };
};

export default connect(mapStateToProps)(ConnectedMain);
