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
    id: state.newOrder.header.id,
    table:
      state.newOrder.header.chTable +
      (state.newOrder.header.tableCategory
        ? "\\" + state.newOrder.header.tableCategory
        : ""),
    seats: state.newOrder.header.seats,
    totalPrice: state.newOrder.header.totalPrice
  };
};

export default connect(mapStateToProps)(ConnectedHeader);
