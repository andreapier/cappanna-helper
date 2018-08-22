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
    id: state.newOrderHeader.id,
    table:
      state.newOrderHeader.chTable +
      (state.newOrderHeader.tableCategory ? "\\" + state.newOrderHeader.tableCategory : ""),
    seats: state.newOrderHeader.seats,
    totalPrice: state.newOrderHeader.totalPrice
  };
};

export default connect(mapStateToProps)(ConnectedHeader);
