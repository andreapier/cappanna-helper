import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "components/Orders/Confirmation/Header";
import { formatAmount } from "utils/string";

class ConnectedHeader extends Component {
  render() {
    return <Header {...this.props} />;
  }
}

const mapStateToProps = state => {
  return {
    table:
      state.newOrder.header.chTable +
      (state.newOrder.header.tableCategory
        ? "\\" + state.newOrder.header.tableCategory
        : ""),
    seats: state.newOrder.header.seats,
    totalPrice: formatAmount(state.newOrder.header.totalPrice, false)
  };
};

export default connect(mapStateToProps)(ConnectedHeader);
