import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "components/Orders/New/Confirmation/Header";

class ConnectedHeader extends Component {
  render() {
    return <Header {...this.props} />;
  }
}

const mapStateToProps = state => {
  return {
    id: state.newOrder.id,
    table:
      state.newOrder.chTable +
      (state.newOrder.tableCategory ? "\\" + state.newOrder.tableCategory : ""),
    seats: state.newOrder.seats,
    totalPrice: state.newOrder.totalPrice
  };
};

export default connect(mapStateToProps)(ConnectedHeader);
